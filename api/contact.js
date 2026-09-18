const TO = process.env.CONTACT_TO_EMAIL || 'tradeinvestment@diplomaticinformer.com';
const FROM = process.env.CONTACT_FROM_EMAIL || 'Diplomatic Informer Enquiries <forms@virtukey.co.za>';
const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v, n) => typeof v === 'string' ? v.trim().slice(0, n) : '';
const esc = v => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));

module.exports = async (req, res) => {
  if (req.method !== 'POST') { res.setHeader('Allow','POST'); return res.status(405).json({ok:false,error:'Method not allowed.'}); }
  res.setHeader('Cache-Control','no-store');
  if (!process.env.RESEND_API_KEY) { console.error('Resend contact delivery is not configured.'); return res.status(503).json({ok:false,error:'Email delivery is temporarily unavailable.'}); }
  const b = req.body && typeof req.body === 'object' ? req.body : {};
  if (clean(b.website,200)) return res.status(200).json({ok:true});
  const legacy = b.formType !== 'directory_listing' && b.formType !== 'trade_enquiry';
  const formType = b.formType === 'directory_listing' ? 'directory_listing' : 'trade_enquiry';
  const name=clean(b.fullName,120), org=clean(b.organisation,160), email=clean(b.email,254).toLowerCase(), country=clean(b.country,100);
  const invalid = () => res.status(400).json({ok:false,error:'Please complete all required fields and confirm consent.'});
  if (!name || !emailTest.test(email) || (!legacy && (!country || b.consent !== 'on'))) return invalid();
  let subject, fields;
  if (formType === 'directory_listing') {
    const category=clean(b.directoryCategory,160), descriptor=clean(b.descriptor,180), period=clean(b.listingPeriod,120), pkg=clean(b.listingPackage,160);
    if (!org || !category || !descriptor || !period || !pkg) return invalid();
    subject=`[Directory Listing Application] ${org}`;
    fields=[['Pathway','A–Z Directory Listing application'],['Organisation / company',org],['Contact person',name],['Business email',email],['Website',clean(b.companyWebsite,500)],['Country',country],['City',clean(b.city,100)],['A–Z Directory category',category],['Directory descriptor',descriptor],['Listing period',period],['Listing package',pkg],['Extra requirements / notes',clean(b.notes,3000)]];
  } else {
    const focus=clean(b.enquiryType,100), message=clean(b.message,5000);
    if (!focus || message.length < 10) return invalid();
    subject=`[Trade Enquiry] ${focus} — ${name}`;
    fields=[['Pathway',legacy?'Legacy website trade enquiry':'Trade Enquiry'],['Full name',name],['Organisation / company',org],['Business email',email],['Country / market',country],['Enquiry focus',focus],['Relevant sector',clean(b.sector,160)],['Indicative timeframe',clean(b.timeframe,160)],['Opportunity size / investment range',clean(b.opportunitySize,160)],['Detailed enquiry',message]];
  }
  const stamp=new Date().toISOString(), source=clean(req.headers.referer,500)||'Not provided';
  fields.push(['Submitted (UTC)',stamp],['Source URL',source]);
  const text=fields.map(([k,v])=>`${k}: ${v||'Not provided'}`).join('\n');
  const rows=fields.map(([k,v])=>`<tr><td style="padding:6px 16px 6px 0;color:#6b6a5f;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v||'Not provided')}</td></tr>`).join('');
  const html=`<!doctype html><html><body style="margin:0;background:#f4f3ee;color:#141412;font-family:Arial,sans-serif"><div style="max-width:680px;margin:auto;padding:32px 18px"><header style="background:#0a0a0a;border-top:4px solid #989809;padding:28px;color:#faf9f5"><div style="color:#b4b421;font-size:11px;font-weight:bold;letter-spacing:.16em;text-transform:uppercase">The Diplomatic Informer</div><h1 style="margin:12px 0 0;font-size:26px">${formType==='directory_listing'?'Directory Listing Application':'Trade Enquiry'}</h1></header><main style="background:#fff;padding:28px;border:1px solid #deddd6;border-top:0"><table role="presentation" style="width:100%;border-collapse:collapse;font-size:15px;line-height:1.55">${rows}</table><a href="mailto:${esc(email)}?subject=${encodeURIComponent('Re: '+subject)}" style="display:inline-block;margin-top:24px;padding:14px 22px;background:#990025;color:#fff;text-decoration:none;font-weight:bold">Reply to ${esc(name)}</a></main></div></body></html>`;
  try {
    const sent=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:FROM,to:[TO],reply_to:email,subject,text,html})});
    if (!sent.ok) { console.error('Resend rejected contact email:',sent.status,await sent.text()); return res.status(502).json({ok:false,error:'We could not send your enquiry. Please try again.'}); }
    return res.status(200).json({ok:true});
  } catch (error) { console.error('Contact form delivery failed:',error); return res.status(502).json({ok:false,error:'We could not send your enquiry. Please try again.'}); }
};
