const fs = require('fs');
const path = require('path');
const dir = path.dirname(__filename);

// ============================================================
// TEMPLATE 1: propertyvue-realty.html
// Real Estate Agency — Dark Navy + Gold
// Fonts: DM Serif Display + Inter
// ============================================================
const t1 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{{short_description}}">
<title>{{business_name}} — Premium Real Estate</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
:root{--brand-primary:#d4a253;--brand-secondary:#0f172a;--bg-light:#faf8f5;--bg-card:#ffffff;--text-dark:#0f172a;--text-muted:#64748b;--text-light:#f8fafc;--gold-glow:rgba(212,162,83,0.15);--border:rgba(15,23,42,0.08)}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;color:var(--text-dark);background:var(--bg-light);line-height:1.6}
h1,h2,h3,h4{font-family:'DM Serif Display',serif;font-weight:400;line-height:1.2}
a{text-decoration:none;color:inherit}img{max-width:100%;display:block}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(15,23,42,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(212,162,83,0.12)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1200px;margin:0 auto}
.nav-logo{font-family:'DM Serif Display',serif;font-size:1.4rem;color:var(--brand-primary);letter-spacing:0.02em}
.nav-links{display:flex;gap:32px;list-style:none}
.nav-links a{color:rgba(255,255,255,0.65);font-size:0.82rem;font-weight:500;letter-spacing:0.05em;text-transform:uppercase;transition:color 0.3s}
.nav-links a:hover{color:var(--brand-primary)}
.nav-cta{background:var(--brand-primary);color:var(--brand-secondary);padding:10px 24px;font-size:0.8rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border:none;cursor:pointer;transition:all 0.3s}
.nav-cta:hover{background:#c4923e;transform:translateY(-1px)}
.menu-toggle{display:none}.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;z-index:101}
.hamburger span{width:26px;height:2px;background:var(--text-light);transition:all 0.3s}
.hero{position:relative;min-height:100vh;display:flex;align-items:center;background:linear-gradient(135deg,rgba(15,23,42,0.88),rgba(15,23,42,0.55)),url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80') center/cover no-repeat}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:180px;background:linear-gradient(transparent,var(--bg-light))}
.hero-content{position:relative;z-index:2;max-width:700px;padding:0 24px}
.hero-badge{display:inline-block;padding:8px 20px;background:rgba(212,162,83,0.12);border:1px solid rgba(212,162,83,0.25);color:var(--brand-primary);font-size:0.72rem;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:24px}
.hero h1{font-size:clamp(2.8rem,5vw,4.5rem);color:var(--text-light);margin-bottom:16px}
.hero h1 em{color:var(--brand-primary);font-style:italic}
.hero-slogan{font-size:1.2rem;color:rgba(255,255,255,0.65);margin-bottom:12px;font-weight:300}
.hero-desc{font-size:0.95rem;color:rgba(255,255,255,0.45);margin-bottom:40px;max-width:520px;line-height:1.7}
.hero-btns{display:flex;gap:16px;flex-wrap:wrap}
.btn-gold{background:var(--brand-primary);color:var(--brand-secondary);padding:15px 38px;font-size:0.82rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;transition:all 0.3s;border:2px solid var(--brand-primary)}
.btn-gold:hover{background:transparent;color:var(--brand-primary)}
.btn-outline{border:2px solid rgba(255,255,255,0.25);color:var(--text-light);padding:15px 38px;font-size:0.82rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;transition:all 0.3s;background:transparent}
.btn-outline:hover{border-color:var(--brand-primary);color:var(--brand-primary)}
.stats{position:relative;z-index:3;margin-top:-60px;padding:0 24px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);background:var(--brand-secondary);max-width:1000px;margin:0 auto}
.stat-item{padding:36px 20px;text-align:center;border-right:1px solid rgba(255,255,255,0.05)}
.stat-item:last-child{border-right:none}
.stat-number{font-family:'DM Serif Display',serif;font-size:2.5rem;color:var(--brand-primary)}
.stat-label{font-size:0.7rem;color:rgba(255,255,255,0.45);text-transform:uppercase;letter-spacing:0.1em;margin-top:4px}
section{padding:100px 0}
.section-label{font-size:0.68rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--brand-primary);margin-bottom:10px}
.section-title{font-size:clamp(2rem,3vw,2.8rem);color:var(--text-dark);margin-bottom:14px}
.section-subtitle{font-size:1rem;color:var(--text-muted);max-width:540px;line-height:1.7}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;margin-top:48px}
.about-img{position:relative}.about-img img{width:100%;height:420px;object-fit:cover}
.about-img::after{content:'';position:absolute;top:16px;left:16px;right:-16px;bottom:-16px;border:2px solid var(--brand-primary);z-index:-1}
.about-text p{color:var(--text-muted);margin-bottom:18px;font-size:0.93rem;line-height:1.75}
.about-list{list-style:none;margin-top:20px}
.about-list li{padding:9px 0 9px 24px;position:relative;color:var(--text-dark);font-weight:500;font-size:0.9rem}
.about-list li::before{content:'';position:absolute;left:0;top:50%;width:12px;height:2px;background:var(--brand-primary)}
.listings{background:#fff}
.listings-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px}
.listing-card{background:var(--bg-light);border:1px solid var(--border);overflow:hidden;transition:all 0.4s}
.listing-card:hover{transform:translateY(-8px);box-shadow:0 20px 50px rgba(0,0,0,0.07);border-color:var(--brand-primary)}
.listing-img{height:210px;overflow:hidden}
.listing-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s}
.listing-card:hover .listing-img img{transform:scale(1.08)}
.listing-body{padding:20px}
.listing-price{font-family:'DM Serif Display',serif;font-size:1.35rem;color:var(--brand-primary)}
.listing-address{font-size:0.84rem;color:var(--text-muted);margin-top:4px}
.listing-meta{display:flex;gap:14px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)}
.listing-meta span{font-size:0.76rem;color:var(--text-muted)}
.benefits{background:var(--brand-secondary);color:var(--text-light)}
.benefits .section-subtitle{color:rgba(255,255,255,0.4)}
.benefits-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;margin-top:48px}
.benefit-card{padding:40px 28px;border:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.02);transition:all 0.3s}
.benefit-card:hover{border-color:rgba(212,162,83,0.25);background:rgba(212,162,83,0.04)}
.benefit-icon{font-size:2rem;margin-bottom:20px}
.benefit-card h3{font-size:1.25rem;margin-bottom:10px}
.benefit-card p{font-size:0.88rem;color:rgba(255,255,255,0.45);line-height:1.7}
.neighborhoods-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px}
.hood-card{position:relative;height:350px;overflow:hidden;cursor:pointer}
.hood-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.6s}
.hood-card:hover img{transform:scale(1.1)}
.hood-overlay{position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(15,23,42,0.88));display:flex;flex-direction:column;justify-content:flex-end;padding:28px}
.hood-card h3{font-size:1.5rem;color:var(--text-light)}
.hood-card p{font-size:0.82rem;color:rgba(255,255,255,0.55);margin-top:4px}
.contact{background:#f0ece6}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;margin-top:48px}
.contact-form{display:flex;flex-direction:column;gap:14px}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.contact-form input,.contact-form textarea{width:100%;padding:14px 18px;border:1px solid rgba(15,23,42,0.1);background:#fff;font-family:'Inter',sans-serif;font-size:0.88rem;outline:none;transition:border-color 0.3s}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--brand-primary)}
.contact-form textarea{height:120px;resize:vertical}
.form-submit{background:var(--brand-primary);color:var(--brand-secondary);padding:16px 40px;border:none;font-size:0.82rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;cursor:pointer;transition:all 0.3s;align-self:flex-start}
.form-submit:hover{background:#c4923e}
.contact-info h3{font-size:1.4rem;margin-bottom:24px}
.info-row{display:flex;gap:16px;margin-bottom:22px}
.info-icon{width:46px;height:46px;background:rgba(212,162,83,0.1);display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.info-row h4{font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin-bottom:3px}
.info-row p{font-size:0.93rem;color:var(--text-dark)}
.footer{background:var(--brand-secondary);padding:56px 0 28px;color:rgba(255,255,255,0.35)}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;margin-bottom:44px}
.footer-brand{font-family:'DM Serif Display',serif;font-size:1.3rem;color:var(--brand-primary);margin-bottom:12px}
.footer-desc{font-size:0.84rem;line-height:1.75;max-width:260px}
.footer h4{font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.55);margin-bottom:16px}
.footer ul{list-style:none}.footer li{margin-bottom:10px}
.footer li a{font-size:0.84rem;transition:color 0.3s}
.footer li a:hover{color:var(--brand-primary)}
.footer-bottom{border-top:1px solid rgba(255,255,255,0.05);padding-top:22px;display:flex;justify-content:space-between;font-size:0.78rem}
@media(max-width:1024px){.listings-grid{grid-template-columns:repeat(2,1fr)}.footer-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.hamburger{display:flex}.nav-links,.nav-cta{display:none}.menu-toggle:checked~.nav-inner .nav-links{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--brand-secondary);padding:24px;gap:16px;border-top:1px solid rgba(212,162,83,0.1)}.menu-toggle:checked~.nav-inner .nav-cta{display:block;position:absolute;top:calc(100% + 180px);left:24px;right:24px;text-align:center}.hero h1{font-size:2.4rem}.stats-grid{grid-template-columns:repeat(2,1fr)}.stat-item:nth-child(2){border-right:none}.about-grid,.contact-grid{grid-template-columns:1fr;gap:32px}.about-img::after{display:none}.benefits-grid,.neighborhoods-grid{grid-template-columns:1fr}.listings-grid{grid-template-columns:1fr}.form-row{grid-template-columns:1fr}.footer-grid{grid-template-columns:1fr}.footer-bottom{flex-direction:column;gap:8px}}
</style>
</head>
<body>

<nav class="nav"><input type="checkbox" id="menu" class="menu-toggle" hidden><div class="nav-inner"><a href="#" class="nav-logo">{{business_name}}</a><label for="menu" class="hamburger"><span></span><span></span><span></span></label><ul class="nav-links"><li><a href="#about">About</a></li><li><a href="#listings">Listings</a></li><li><a href="#neighborhoods">Areas</a></li><li><a href="#contact">Contact</a></li></ul><a href="tel:{{phone}}" class="nav-cta">{{phone}}</a></div></nav>

<section class="hero"><div class="container"><div class="hero-content"><div class="hero-badge">Premium Real Estate</div><h1>Find Your<br><em>Dream Home</em></h1><p class="hero-slogan">{{slogan}}</p><p class="hero-desc">{{short_description}}</p><div class="hero-btns"><a href="#listings" class="btn-gold">View Properties</a><a href="#contact" class="btn-outline">Schedule Viewing</a></div></div></div></section>

<div class="stats"><div class="stats-grid"><div class="stat-item"><div class="stat-number">850+</div><div class="stat-label">Properties Sold</div></div><div class="stat-item"><div class="stat-number">25</div><div class="stat-label">Years Experience</div></div><div class="stat-item"><div class="stat-number">4</div><div class="stat-label">Office Locations</div></div><div class="stat-item"><div class="stat-number">38</div><div class="stat-label">Expert Agents</div></div></div></div>

<section id="about"><div class="container"><div class="section-label">Our Approach</div><div class="section-title">Redefining Luxury Real Estate</div><div class="about-grid"><div class="about-img"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Luxury property interior"></div><div class="about-text"><p>At {{business_name}}, we understand that purchasing a property is more than a transaction. It is a milestone. Our dedicated team combines market expertise with a personalized approach to ensure every client finds their perfect home.</p><p>With over two decades of experience in premium real estate, we have built lasting relationships and an unmatched portfolio of exclusive properties.</p><ul class="about-list"><li>Bespoke property matching tailored to your lifestyle</li><li>Exclusive off-market listings and pre-launch access</li><li>End-to-end guidance from viewing to closing</li><li>Post-purchase concierge and property management</li></ul></div></div></div></section>

<section class="listings" id="listings"><div class="container"><div class="section-label">Featured Properties</div><div class="section-title">Handpicked Residences</div><p class="section-subtitle">Each property in our portfolio is carefully selected to meet the highest standards of quality, location, and investment potential.</p><div class="listings-grid"><div class="listing-card"><div class="listing-img"><img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500&q=80" alt="Modern villa"></div><div class="listing-body"><div class="listing-price">&euro;2,450,000</div><div class="listing-address">128 Oceanview Drive, Malibu</div><div class="listing-meta"><span>5 Beds</span><span>4 Baths</span><span>420 m&sup2;</span></div></div></div><div class="listing-card"><div class="listing-img"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80" alt="Penthouse"></div><div class="listing-body"><div class="listing-price">&euro;1,890,000</div><div class="listing-address">42 Avenue Foch, Paris 16e</div><div class="listing-meta"><span>3 Beds</span><span>3 Baths</span><span>280 m&sup2;</span></div></div></div><div class="listing-card"><div class="listing-img"><img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=500&q=80" alt="Estate"></div><div class="listing-body"><div class="listing-price">&euro;3,200,000</div><div class="listing-address">7 Vineyard Lane, Provence</div><div class="listing-meta"><span>6 Beds</span><span>5 Baths</span><span>610 m&sup2;</span></div></div></div><div class="listing-card"><div class="listing-img"><img src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=500&q=80" alt="Townhouse"></div><div class="listing-body"><div class="listing-price">&euro;975,000</div><div class="listing-address">15 Keizersgracht, Amsterdam</div><div class="listing-meta"><span>4 Beds</span><span>3 Baths</span><span>340 m&sup2;</span></div></div></div></div></div></section>

<section class="benefits" id="why"><div class="container"><div class="section-label">Why Choose Us</div><div class="section-title" style="color:var(--text-light)">The {{business_name}} Difference</div><p class="section-subtitle">We go beyond simply selling properties. We craft experiences and build lasting partnerships.</p><div class="benefits-grid"><div class="benefit-card"><div class="benefit-icon">&#127968;</div><h3>Exclusive Portfolio</h3><p>Access to off-market luxury properties and pre-launch developments that never reach public listings.</p></div><div class="benefit-card"><div class="benefit-icon">&#129309;</div><h3>Personal Concierge</h3><p>A dedicated agent guides you through every step, from initial search to key handover and beyond.</p></div><div class="benefit-card"><div class="benefit-icon">&#128200;</div><h3>Market Intelligence</h3><p>Data-driven insights and neighborhood analysis to ensure your investment performs at its peak.</p></div></div></div></section>

<section id="neighborhoods"><div class="container"><div class="section-label">Explore</div><div class="section-title">Premier Neighborhoods</div><p class="section-subtitle">Discover the most sought-after communities where lifestyle meets exceptional value.</p><div class="neighborhoods-grid"><div class="hood-card"><img src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80" alt="Downtown skyline"><div class="hood-overlay"><h3>Downtown Core</h3><p>48 available properties</p></div></div><div class="hood-card"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80" alt="Suburban estates"><div class="hood-overlay"><h3>The Estates</h3><p>23 available properties</p></div></div><div class="hood-card"><img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80" alt="Waterfront"><div class="hood-overlay"><h3>Waterfront District</h3><p>31 available properties</p></div></div></div></div></section>

<section class="contact" id="contact"><div class="container"><div class="section-label">Get In Touch</div><div class="section-title">Start Your Journey</div><p class="section-subtitle">Whether buying, selling, or simply exploring, our team is ready to assist.</p><div class="contact-grid"><form class="contact-form" onsubmit="return false;"><div class="form-row"><input type="text" placeholder="Full Name" required><input type="email" placeholder="Email Address" required></div><div class="form-row"><input type="tel" placeholder="Phone Number"><input type="text" placeholder="Property Interest"></div><textarea placeholder="Tell us about your ideal property..."></textarea><button type="submit" class="form-submit">Send Inquiry</button></form><div class="contact-info"><h3>Office Details</h3><div class="info-row"><div class="info-icon">&#128205;</div><div><h4>Address</h4><p>{{address}}</p></div></div><div class="info-row"><div class="info-icon">&#128222;</div><div><h4>Phone</h4><p>{{phone}}</p></div></div><div class="info-row"><div class="info-icon">&#9993;</div><div><h4>Email</h4><p>{{email}}</p></div></div><div class="info-row"><div class="info-icon">&#128336;</div><div><h4>Office Hours</h4><p>{{hours}}</p></div></div></div></div></div></section>

<footer class="footer"><div class="container"><div class="footer-grid"><div><div class="footer-brand">{{business_name}}</div><p class="footer-desc">Connecting discerning buyers with exceptional properties. Your dream home awaits.</p></div><div><h4>Quick Links</h4><ul><li><a href="#about">About Us</a></li><li><a href="#listings">Properties</a></li><li><a href="#neighborhoods">Neighborhoods</a></li><li><a href="#contact">Contact</a></li></ul></div><div><h4>Services</h4><ul><li><a href="#">Residential Sales</a></li><li><a href="#">Luxury Rentals</a></li><li><a href="#">Property Valuation</a></li><li><a href="#">Investment Advisory</a></li></ul></div><div><h4>Contact</h4><ul><li>{{address}}</li><li>{{phone}}</li><li>{{email}}</li><li>{{hours}}</li></ul></div></div><div class="footer-bottom"><span>&copy; 2025 {{business_name}}. All rights reserved.</span><span>Privacy Policy | Terms of Service</span></div></div></footer>

</body>
</html>`;

// ============================================================
// TEMPLATE 2: homefinder-agency.html
// Small Real Estate / Property Management — Light + Teal
// Fonts: Plus Jakarta Sans
// ============================================================
const t2 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{{short_description}}">
<title>{{business_name}} — Your Local Property Expert</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>
:root{--brand-primary:#0d9488;--brand-secondary:#1e293b;--bg:#f8fafb;--bg-card:#ffffff;--bg-dark:#0f172a;--text-dark:#1e293b;--text-muted:#64748b;--text-light:#f1f5f9;--teal-glow:rgba(13,148,136,0.1);--border:rgba(30,41,59,0.08)}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Plus Jakarta Sans',sans-serif;color:var(--text-dark);background:var(--bg);line-height:1.6}
a{text-decoration:none;color:inherit}img{max-width:100%;display:block}
.container{max-width:1100px;margin:0 auto;padding:0 24px}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(248,250,251,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;max-width:1100px;margin:0 auto}
.nav-logo{font-size:1.2rem;font-weight:800;color:var(--brand-secondary)}
.nav-logo span{color:var(--brand-primary)}
.nav-links{display:flex;gap:28px;list-style:none}
.nav-links a{color:var(--text-muted);font-size:0.82rem;font-weight:500;transition:color 0.3s}
.nav-links a:hover{color:var(--brand-primary)}
.nav-cta{background:var(--brand-primary);color:#fff;padding:10px 22px;font-size:0.8rem;font-weight:600;border-radius:8px;border:none;cursor:pointer;transition:all 0.3s}
.nav-cta:hover{background:#0b7f74;transform:translateY(-1px)}
.menu-toggle{display:none}.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;z-index:101}
.hamburger span{width:24px;height:2px;background:var(--brand-secondary);transition:all 0.3s}
.hero{padding:140px 0 80px}
.hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.hero-text .tag{display:inline-block;padding:6px 14px;background:var(--teal-glow);color:var(--brand-primary);font-size:0.72rem;font-weight:700;border-radius:20px;letter-spacing:0.04em;text-transform:uppercase;margin-bottom:20px}
.hero-text h1{font-size:clamp(2.2rem,4vw,3.4rem);font-weight:800;color:var(--brand-secondary);line-height:1.1;margin-bottom:16px}
.hero-text h1 span{color:var(--brand-primary)}
.hero-text .slogan{font-size:1rem;color:var(--brand-primary);font-weight:500;margin-bottom:10px}
.hero-text p{font-size:0.95rem;color:var(--text-muted);line-height:1.7;margin-bottom:28px;max-width:440px}
.hero-btns{display:flex;gap:12px;flex-wrap:wrap}
.btn-teal{background:var(--brand-primary);color:#fff;padding:14px 32px;font-size:0.82rem;font-weight:600;border-radius:10px;transition:all 0.3s;border:none;cursor:pointer}
.btn-teal:hover{background:#0b7f74;transform:translateY(-2px);box-shadow:0 8px 24px rgba(13,148,136,0.2)}
.btn-ghost{background:transparent;border:1.5px solid var(--border);color:var(--brand-secondary);padding:14px 32px;font-size:0.82rem;font-weight:600;border-radius:10px;transition:all 0.3s;cursor:pointer}
.btn-ghost:hover{border-color:var(--brand-primary);color:var(--brand-primary)}
.hero-visual{position:relative}
.hero-visual img{width:100%;border-radius:20px;object-fit:cover;aspect-ratio:4/3}
.hero-stat{position:absolute;bottom:-24px;left:24px;background:var(--bg-card);padding:18px 24px;border-radius:14px;box-shadow:0 8px 32px rgba(0,0,0,0.08);display:flex;gap:20px}
.hero-stat-item .num{font-size:1.5rem;font-weight:800;color:var(--brand-primary)}
.hero-stat-item .txt{font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.06em}
section{padding:80px 0}
.sec-label{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--brand-primary);margin-bottom:8px}
.sec-title{font-size:clamp(1.8rem,2.5vw,2.4rem);font-weight:800;color:var(--brand-secondary);margin-bottom:12px}
.sec-desc{font-size:0.92rem;color:var(--text-muted);max-width:500px;line-height:1.7}
.sec-header{text-align:center;margin-bottom:48px}.sec-header .sec-desc{margin:0 auto}
.about{background:var(--bg-card);border-radius:24px;margin:0 24px;padding:64px}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.about-img img{width:100%;border-radius:16px;aspect-ratio:4/3;object-fit:cover}
.about-text p{font-size:0.92rem;color:var(--text-muted);line-height:1.75;margin-bottom:16px}
.about-checks{list-style:none;margin-top:16px}
.about-checks li{padding:8px 0 8px 28px;position:relative;font-size:0.88rem;font-weight:500;color:var(--brand-secondary)}
.about-checks li::before{content:'\\2713';position:absolute;left:0;color:var(--brand-primary);font-weight:700}
.services-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.svc-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:28px;transition:all 0.3s}
.svc-card:hover{transform:translateY(-6px);box-shadow:0 12px 36px rgba(0,0,0,0.06);border-color:var(--brand-primary)}
.svc-icon{width:48px;height:48px;background:var(--teal-glow);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:1.4rem;margin-bottom:16px}
.svc-card h3{font-size:1rem;font-weight:700;margin-bottom:8px}
.svc-card p{font-size:0.82rem;color:var(--text-muted);line-height:1.65}
.prop-types{background:var(--bg-dark);color:var(--text-light);border-radius:24px;margin:0 24px;padding:64px}
.prop-types .sec-title{color:var(--text-light)}
.prop-types .sec-desc{color:rgba(241,245,249,0.5)}
.prop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px}
.prop-type-card{position:relative;height:320px;border-radius:16px;overflow:hidden;cursor:pointer}
.prop-type-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s}
.prop-type-card:hover img{transform:scale(1.08)}
.prop-type-overlay{position:absolute;inset:0;background:linear-gradient(transparent 40%,rgba(15,23,42,0.85));display:flex;flex-direction:column;justify-content:flex-end;padding:24px}
.prop-type-card h3{font-size:1.2rem;font-weight:700;color:#fff}
.prop-type-card p{font-size:0.78rem;color:rgba(255,255,255,0.55);margin-top:4px}
.testimonials-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.test-card{background:var(--bg-card);border:1px solid var(--border);border-radius:16px;padding:28px}
.test-stars{color:var(--brand-primary);font-size:0.88rem;margin-bottom:12px;letter-spacing:2px}
.test-card p{font-size:0.88rem;color:var(--text-muted);line-height:1.7;font-style:italic;margin-bottom:16px}
.test-author{font-size:0.82rem;font-weight:700;color:var(--brand-secondary)}
.test-role{font-size:0.72rem;color:var(--text-muted);margin-top:2px}
.how-section{background:var(--bg-dark);color:var(--text-light)}
.how-section .sec-title{color:var(--text-light)}
.how-section .sec-desc{color:rgba(241,245,249,0.5)}
.how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-top:48px}
.how-step{text-align:center;padding:24px 16px}
.how-num{width:48px;height:48px;border-radius:50%;background:rgba(13,148,136,0.15);color:var(--brand-primary);display:flex;align-items:center;justify-content:center;font-size:1.1rem;font-weight:800;margin:0 auto 16px}
.how-step h3{font-size:0.95rem;font-weight:700;margin-bottom:8px}
.how-step p{font-size:0.8rem;color:rgba(241,245,249,0.45);line-height:1.6}
.contact-section{padding:80px 0}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:40px}
.contact-form{display:flex;flex-direction:column;gap:14px}
.contact-form input,.contact-form textarea{width:100%;padding:14px 18px;border:1px solid var(--border);border-radius:10px;font-family:'Plus Jakarta Sans',sans-serif;font-size:0.88rem;outline:none;background:var(--bg-card);transition:border-color 0.3s}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--brand-primary)}
.contact-form textarea{height:120px;resize:vertical}
.form-submit{background:var(--brand-primary);color:#fff;padding:14px 32px;border:none;font-size:0.82rem;font-weight:700;border-radius:10px;cursor:pointer;transition:all 0.3s;align-self:flex-start}
.form-submit:hover{background:#0b7f74}
.contact-cards{display:flex;flex-direction:column;gap:16px}
.c-card{background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:20px 24px;display:flex;gap:16px;align-items:center}
.c-icon{width:44px;height:44px;background:var(--teal-glow);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0}
.c-card h4{font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted);margin-bottom:2px}
.c-card p{font-size:0.9rem;font-weight:500;color:var(--brand-secondary)}
.footer{background:var(--bg-dark);padding:48px 0 24px;color:rgba(241,245,249,0.35)}
.footer-inner{display:flex;justify-content:space-between;align-items:center;padding-bottom:24px;border-bottom:1px solid rgba(255,255,255,0.05);margin-bottom:20px}
.footer-logo{font-size:1.1rem;font-weight:800;color:var(--brand-primary)}
.footer-links{display:flex;gap:20px;list-style:none}
.footer-links a{font-size:0.8rem;transition:color 0.3s}
.footer-links a:hover{color:var(--brand-primary)}
.footer-bottom{text-align:center;font-size:0.75rem}
@media(max-width:1024px){.services-grid{grid-template-columns:repeat(2,1fr)}.how-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.hamburger{display:flex}.nav-links,.nav-cta{display:none}.menu-toggle:checked~.nav-inner .nav-links{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--bg);padding:20px;gap:14px;border-bottom:1px solid var(--border)}.hero-grid,.about-grid,.contact-grid{grid-template-columns:1fr;gap:32px}.hero-stat{position:relative;bottom:0;left:0;margin-top:16px}.services-grid,.testimonials-grid,.prop-grid{grid-template-columns:1fr}.how-grid{grid-template-columns:1fr}.about{margin:0;border-radius:0;padding:48px 24px}.prop-types{margin:0;border-radius:0;padding:48px 24px}.footer-inner{flex-direction:column;gap:16px;text-align:center}}
</style>
</head>
<body>

<nav class="nav"><input type="checkbox" id="menu" class="menu-toggle" hidden><div class="nav-inner"><a href="#" class="nav-logo">{{business_name}}</a><label for="menu" class="hamburger"><span></span><span></span><span></span></label><ul class="nav-links"><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#testimonials">Reviews</a></li><li><a href="#contact">Contact</a></li></ul><a href="#contact" class="nav-cta">Free Consultation</a></div></nav>

<section class="hero"><div class="container"><div class="hero-grid"><div class="hero-text"><span class="tag">Local Property Expert</span><h1>Your Home,<br><span>Your Story.</span></h1><p class="slogan">{{slogan}}</p><p>{{short_description}}</p><div class="hero-btns"><a href="#properties" class="btn-teal">Browse Properties</a><a href="#contact" class="btn-ghost">Get in Touch</a></div></div><div class="hero-visual"><img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&q=80" alt="Beautiful home exterior"><div class="hero-stat"><div class="hero-stat-item"><div class="num">240+</div><div class="txt">Homes Sold</div></div><div class="hero-stat-item"><div class="num">14</div><div class="txt">Years Local</div></div><div class="hero-stat-item"><div class="num">4.9</div><div class="txt">Google Rating</div></div></div></div></div></div></section>

<section id="about"><div class="about"><div class="about-grid"><div><img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80" alt="Office" class="about-img"></div><div class="about-text"><div class="sec-label">About Us</div><div class="sec-title">A Personal Approach to Property</div><p>As an independent agency, we take the time to understand exactly what you need. No pressure, no rushing. Just honest advice and a genuine commitment to finding you the right home.</p><p>With years of experience in the local property market, we know every neighbourhood, every trend, and every opportunity.</p><ul class="about-checks"><li>Independent and client-focused since day one</li><li>Deep knowledge of local neighborhoods and pricing</li><li>Transparent process with no hidden fees</li><li>After-sale support and property management</li></ul></div></div></div></section>

<section id="services"><div class="container"><div class="sec-header"><div class="sec-label">What We Do</div><div class="sec-title">Our Services</div><p class="sec-desc">Comprehensive property services tailored to your needs.</p></div><div class="services-grid"><div class="svc-card"><div class="svc-icon">&#127968;</div><h3>Residential Sales</h3><p>Expert guidance through every step of buying or selling your home.</p></div><div class="svc-card"><div class="svc-icon">&#128273;</div><h3>Rental Management</h3><p>Full-service property management for landlords and tenants.</p></div><div class="svc-card"><div class="svc-icon">&#128200;</div><h3>Property Valuation</h3><p>Accurate market valuations backed by data and local expertise.</p></div><div class="svc-card"><div class="svc-icon">&#128188;</div><h3>Investment Advice</h3><p>Strategic portfolio guidance for property investors.</p></div></div></div></section>

<section><div class="prop-types"><div class="sec-header"><div class="sec-label" style="color:rgba(13,148,136,0.8)">Explore</div><div class="sec-title">Property Types</div><p class="sec-desc">From city apartments to countryside estates, we cover it all.</p></div><div class="prop-grid"><div class="prop-type-card"><img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&q=80" alt="Apartment"><div class="prop-type-overlay"><h3>City Apartments</h3><p>32 available listings</p></div></div><div class="prop-type-card"><img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&q=80" alt="Family Home"><div class="prop-type-overlay"><h3>Family Homes</h3><p>18 available listings</p></div></div><div class="prop-type-card"><img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80" alt="Luxury Villa"><div class="prop-type-overlay"><h3>Luxury Villas</h3><p>8 available listings</p></div></div></div></div></section>

<section id="testimonials"><div class="container"><div class="sec-header"><div class="sec-label">Testimonials</div><div class="sec-title">What Our Clients Say</div></div><div class="testimonials-grid"><div class="test-card"><div class="test-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>They made the entire buying process stress-free. Always available, always honest. Could not have asked for a better experience.</p><div class="test-author">Marc D.</div><div class="test-role">First-time Buyer</div></div><div class="test-card"><div class="test-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>Sold our family home in under three weeks at asking price. Their local market knowledge is truly exceptional.</p><div class="test-author">Sophie L.</div><div class="test-role">Home Seller</div></div><div class="test-card"><div class="test-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>As a landlord with multiple properties, their management service has been invaluable. Professional and responsive.</p><div class="test-author">Thomas B.</div><div class="test-role">Property Investor</div></div></div></div></section>

<section class="how-section"><div class="container"><div class="sec-header"><div class="sec-label" style="color:rgba(13,148,136,0.8)">Process</div><div class="sec-title">How It Works</div><p class="sec-desc">A simple, transparent process from start to finish.</p></div><div class="how-grid"><div class="how-step"><div class="how-num">1</div><h3>Initial Consultation</h3><p>We listen to your needs and understand your ideal property or selling goals.</p></div><div class="how-step"><div class="how-num">2</div><h3>Property Matching</h3><p>We search our network and database for properties that fit your criteria.</p></div><div class="how-step"><div class="how-num">3</div><h3>Viewings & Advice</h3><p>Accompanied viewings with honest feedback and market context.</p></div><div class="how-step"><div class="how-num">4</div><h3>Closing & Beyond</h3><p>We handle negotiations, paperwork, and support you after the deal.</p></div></div></div></section>

<section id="contact" class="contact-section"><div class="container"><div class="sec-header"><div class="sec-label">Contact</div><div class="sec-title">Get In Touch</div><p class="sec-desc">Ready to find your next home? Let us know how we can help.</p></div><div class="contact-grid"><form class="contact-form" onsubmit="return false;"><input type="text" placeholder="Your Name" required><input type="email" placeholder="Your Email" required><input type="tel" placeholder="Phone Number"><textarea placeholder="Tell us what you are looking for..."></textarea><button type="submit" class="form-submit">Send Message</button></form><div class="contact-cards"><div class="c-card"><div class="c-icon">&#128205;</div><div><h4>Address</h4><p>{{address}}</p></div></div><div class="c-card"><div class="c-icon">&#128222;</div><div><h4>Phone</h4><p>{{phone}}</p></div></div><div class="c-card"><div class="c-icon">&#9993;</div><div><h4>Email</h4><p>{{email}}</p></div></div><div class="c-card"><div class="c-icon">&#128336;</div><div><h4>Hours</h4><p>{{hours}}</p></div></div></div></div></div></section>

<footer class="footer"><div class="container"><div class="footer-inner"><div class="footer-logo">{{business_name}}</div><ul class="footer-links"><li><a href="#about">About</a></li><li><a href="#services">Services</a></li><li><a href="#testimonials">Reviews</a></li><li><a href="#contact">Contact</a></li></ul></div><div class="footer-bottom">&copy; 2025 {{business_name}}. Licensed Real Estate Broker.</div></div></footer>

</body>
</html>`;

// ============================================================
// TEMPLATE 3: autodrive-motors.html
// Car Dealership — Black + Red
// Fonts: Rajdhani + Inter
// ============================================================
const t3 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{{short_description}}">
<title>{{business_name}} — Premium Car Dealership</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
<style>
:root{--brand-primary:#dc2626;--brand-secondary:#171717;--bg:#0a0a0a;--surface:#141414;--surface-2:#1a1a1a;--text-light:#f5f5f5;--text-muted:#737373;--red-glow:rgba(220,38,38,0.12);--border:rgba(255,255,255,0.06)}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;color:var(--text-muted);background:var(--bg);line-height:1.6}
a{text-decoration:none;color:inherit}img{max-width:100%;display:block}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(10,10,10,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;max-width:1200px;margin:0 auto}
.nav-logo{font-family:'Rajdhani',sans-serif;font-size:1.5rem;font-weight:700;color:var(--text-light);letter-spacing:0.03em}
.nav-logo span{color:var(--brand-primary)}
.nav-links{display:flex;gap:28px;list-style:none}
.nav-links a{color:var(--text-muted);font-size:0.82rem;font-weight:500;transition:color 0.3s}
.nav-links a:hover{color:var(--brand-primary)}
.nav-cta{background:var(--brand-primary);color:#fff;padding:10px 24px;font-family:'Rajdhani',sans-serif;font-size:0.85rem;font-weight:700;border:none;border-radius:6px;cursor:pointer;transition:all 0.3s;letter-spacing:0.03em}
.nav-cta:hover{background:#b91c1c;transform:translateY(-1px)}
.menu-toggle{display:none}.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;z-index:101}
.hamburger span{width:26px;height:2px;background:var(--brand-primary);transition:all 0.3s}
.hero{padding:140px 0 80px;text-align:center;position:relative}
.hero::before{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,var(--red-glow),transparent 70%);pointer-events:none}
.hero h1{font-family:'Rajdhani',sans-serif;font-size:clamp(3rem,5.5vw,5rem);font-weight:700;color:var(--text-light);line-height:1;margin-bottom:16px;position:relative}
.hero h1 span{color:var(--brand-primary)}
.hero-slogan{font-size:1.1rem;color:var(--brand-primary);font-weight:500;margin-bottom:12px;font-family:'Rajdhani',sans-serif;position:relative}
.hero-desc{font-size:0.95rem;max-width:520px;margin:0 auto 36px;line-height:1.7;position:relative}
.hero-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;position:relative}
.btn-red{background:var(--brand-primary);color:#fff;padding:14px 36px;font-family:'Rajdhani',sans-serif;font-size:0.88rem;font-weight:700;border:none;border-radius:8px;cursor:pointer;transition:all 0.3s;letter-spacing:0.03em}
.btn-red:hover{background:#b91c1c;transform:translateY(-2px);box-shadow:0 8px 32px rgba(220,38,38,0.3)}
.btn-dark{background:var(--surface);border:1px solid var(--border);color:var(--text-light);padding:14px 36px;font-family:'Rajdhani',sans-serif;font-size:0.88rem;font-weight:700;border-radius:8px;cursor:pointer;transition:all 0.3s;letter-spacing:0.03em}
.btn-dark:hover{border-color:var(--brand-primary);color:var(--brand-primary)}
.hero-image{margin-top:48px;position:relative}
.hero-image img{width:100%;max-width:950px;margin:0 auto;border-radius:16px;object-fit:cover;aspect-ratio:21/9}
.stats-bar{padding:60px 0}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden}
.stat-item{padding:32px 20px;text-align:center;border-right:1px solid var(--border)}
.stat-item:last-child{border-right:none}
.stat-num{font-family:'Rajdhani',sans-serif;font-size:2.2rem;font-weight:700;color:var(--brand-primary)}
.stat-txt{font-size:0.72rem;text-transform:uppercase;letter-spacing:0.08em;margin-top:4px}
section{padding:80px 0}
.sec-label{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--brand-primary);margin-bottom:8px}
.sec-title{font-family:'Rajdhani',sans-serif;font-size:clamp(1.8rem,3vw,2.6rem);font-weight:700;color:var(--text-light);margin-bottom:12px}
.sec-desc{font-size:0.92rem;max-width:520px;line-height:1.7}
.sec-header{text-align:center;margin-bottom:48px}.sec-header .sec-desc{margin:0 auto}
.vehicles-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.v-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden;transition:all 0.4s}
.v-card:hover{transform:translateY(-6px);border-color:rgba(220,38,38,0.3);box-shadow:0 16px 48px rgba(0,0,0,0.3)}
.v-card img{width:100%;aspect-ratio:16/10;object-fit:cover;transition:transform 0.4s}
.v-card:hover img{transform:scale(1.05)}
.v-body{padding:18px}
.v-badge{display:inline-block;padding:3px 10px;background:var(--red-glow);color:var(--brand-primary);font-size:0.65rem;font-weight:700;border-radius:4px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px}
.v-card h3{font-family:'Rajdhani',sans-serif;font-size:1.05rem;font-weight:700;color:var(--text-light);margin-bottom:4px}
.v-specs{font-size:0.76rem;margin-bottom:12px}
.v-bottom{display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid var(--border)}
.v-price{font-family:'Rajdhani',sans-serif;font-size:1.3rem;font-weight:700;color:var(--brand-primary)}
.v-btn{padding:7px 16px;background:rgba(255,255,255,0.04);color:var(--text-light);font-size:0.72rem;font-weight:600;border:1px solid var(--border);border-radius:6px;cursor:pointer;transition:all 0.3s}
.v-btn:hover{background:var(--brand-primary);border-color:var(--brand-primary);color:#fff}
.svc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.svc-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:28px;position:relative;overflow:hidden;transition:all 0.3s}
.svc-card::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:var(--brand-primary);transform:scaleX(0);transition:transform 0.3s}
.svc-card:hover::after{transform:scaleX(1)}
.svc-card:hover{border-color:rgba(220,38,38,0.2)}
.svc-icon{font-size:1.8rem;margin-bottom:14px}
.svc-card h3{font-family:'Rajdhani',sans-serif;font-size:1rem;font-weight:700;color:var(--text-light);margin-bottom:8px}
.svc-card p{font-size:0.82rem;line-height:1.65}
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.why-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:36px 28px;text-align:center;transition:all 0.4s}
.why-card:hover{background:linear-gradient(135deg,rgba(220,38,38,0.06),transparent);border-color:rgba(220,38,38,0.2);transform:translateY(-4px)}
.why-icon{font-size:2rem;margin-bottom:16px}
.why-card h3{font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;color:var(--text-light);margin-bottom:8px}
.why-card p{font-size:0.84rem;line-height:1.65}
.contact-section{padding:80px 0}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:40px}
.contact-form{display:flex;flex-direction:column;gap:14px}
.contact-form input,.contact-form textarea{width:100%;padding:14px 18px;border:1px solid var(--border);border-radius:10px;font-family:'Inter',sans-serif;font-size:0.88rem;outline:none;background:var(--surface);color:var(--text-light);transition:border-color 0.3s}
.contact-form input::placeholder,.contact-form textarea::placeholder{color:var(--text-muted)}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--brand-primary)}
.contact-form textarea{height:120px;resize:vertical}
.form-submit{background:var(--brand-primary);color:#fff;padding:14px 32px;border:none;font-family:'Rajdhani',sans-serif;font-size:0.88rem;font-weight:700;border-radius:10px;cursor:pointer;transition:all 0.3s;letter-spacing:0.03em;align-self:flex-start}
.form-submit:hover{background:#b91c1c}
.showroom-info{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:36px}
.showroom-info h3{font-family:'Rajdhani',sans-serif;font-size:1.3rem;font-weight:700;color:var(--text-light);margin-bottom:24px}
.info-item{display:flex;gap:14px;margin-bottom:20px}
.info-icon{width:42px;height:42px;background:var(--red-glow);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.info-item h4{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin-bottom:2px}
.info-item p{font-size:0.9rem;color:var(--text-light)}
.footer{padding:40px 0;text-align:center;border-top:1px solid var(--border)}
.footer-inner{display:flex;justify-content:space-between;align-items:center}
.footer-logo{font-family:'Rajdhani',sans-serif;font-size:1.1rem;font-weight:700;color:var(--text-light)}
.footer-logo span{color:var(--brand-primary)}
.footer p{font-size:0.78rem}
@media(max-width:1024px){.vehicles-grid,.svc-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.hamburger{display:flex}.nav-links,.nav-cta{display:none}.menu-toggle:checked~.nav-inner .nav-links{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--surface);padding:20px;gap:14px;border-bottom:1px solid var(--border)}.hero h1{font-size:2.6rem}.stats-grid{grid-template-columns:repeat(2,1fr)}.stat-item:nth-child(2){border-right:none}.vehicles-grid,.svc-grid,.why-grid{grid-template-columns:1fr}.contact-grid{grid-template-columns:1fr;gap:32px}.hero-btns{flex-direction:column;align-items:center}.footer-inner{flex-direction:column;gap:12px}}
</style>
</head>
<body>

<nav class="nav"><input type="checkbox" id="menu" class="menu-toggle" hidden><div class="nav-inner"><a href="#" class="nav-logo">{{business_name}}</a><label for="menu" class="hamburger"><span></span><span></span><span></span></label><ul class="nav-links"><li><a href="#inventory">Inventory</a></li><li><a href="#services">Services</a></li><li><a href="#why">Why Us</a></li><li><a href="#contact">Contact</a></li></ul><a href="#contact" class="nav-cta">Book Test Drive</a></div></nav>

<section class="hero"><div class="container"><h1>DRIVE YOUR<br><span>AMBITION.</span></h1><p class="hero-slogan">{{slogan}}</p><p class="hero-desc">{{short_description}}</p><div class="hero-btns"><a href="#inventory" class="btn-red">Browse Inventory</a><a href="#contact" class="btn-dark">Book a Visit</a></div><div class="hero-image"><img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80" alt="Luxury car"></div></div></section>

<div class="stats-bar"><div class="container"><div class="stats-grid"><div class="stat-item"><div class="stat-num">500+</div><div class="stat-txt">Cars Delivered</div></div><div class="stat-item"><div class="stat-num">15</div><div class="stat-txt">Years In Business</div></div><div class="stat-item"><div class="stat-num">4.8</div><div class="stat-txt">Google Rating</div></div><div class="stat-item"><div class="stat-num">30+</div><div class="stat-txt">Premium Brands</div></div></div></div></div>

<section id="inventory"><div class="container"><div class="sec-header"><div class="sec-label">Showroom</div><div class="sec-title">Featured Vehicles</div><p class="sec-desc">Meticulously inspected, fully warranted, and ready for the road.</p></div><div class="vehicles-grid"><div class="v-card"><img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80" alt="BMW M4"><div class="v-body"><span class="v-badge">Featured</span><h3>BMW M4 Competition</h3><div class="v-specs">2023 &middot; 18K km &middot; Auto &middot; Petrol</div><div class="v-bottom"><span class="v-price">&euro;67,900</span><button class="v-btn">Details</button></div></div></div><div class="v-card"><img src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=500&q=80" alt="Mercedes"><div class="v-body"><span class="v-badge">Low KM</span><h3>Mercedes-AMG C63</h3><div class="v-specs">2022 &middot; 24K km &middot; Auto &middot; Petrol</div><div class="v-bottom"><span class="v-price">&euro;54,500</span><button class="v-btn">Details</button></div></div></div><div class="v-card"><img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&q=80" alt="Audi RS5"><div class="v-body"><span class="v-badge">New In</span><h3>Audi RS5 Sportback</h3><div class="v-specs">2023 &middot; 12K km &middot; Auto &middot; Petrol</div><div class="v-bottom"><span class="v-price">&euro;74,200</span><button class="v-btn">Details</button></div></div></div><div class="v-card"><img src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80" alt="Porsche"><div class="v-body"><span class="v-badge">Exclusive</span><h3>Porsche 911 Carrera</h3><div class="v-specs">2021 &middot; 31K km &middot; PDK &middot; Petrol</div><div class="v-bottom"><span class="v-price">&euro;112,000</span><button class="v-btn">Details</button></div></div></div></div></div></section>

<section id="services"><div class="container"><div class="sec-header"><div class="sec-label">Services</div><div class="sec-title">Full Automotive Experience</div><p class="sec-desc">More than a dealership. A complete car ownership partner.</p></div><div class="svc-grid"><div class="svc-card"><div class="svc-icon">&#128270;</div><h3>150-Point Inspection</h3><p>Every vehicle passes our rigorous multi-point mechanical and cosmetic check.</p></div><div class="svc-card"><div class="svc-icon">&#128737;</div><h3>Extended Warranty</h3><p>Up to 3-year comprehensive warranty on all pre-owned vehicles.</p></div><div class="svc-card"><div class="svc-icon">&#128176;</div><h3>Flexible Finance</h3><p>Competitive rates and tailored payment plans to fit your budget.</p></div><div class="svc-card"><div class="svc-icon">&#128666;</div><h3>Home Delivery</h3><p>Free delivery to your door anywhere in the country.</p></div></div></div></section>

<section id="why"><div class="container"><div class="sec-header"><div class="sec-label">Why Us</div><div class="sec-title">The {{business_name}} Promise</div></div><div class="why-grid"><div class="why-card"><div class="why-icon">&#128736;</div><h3>Certified Quality</h3><p>Every vehicle is workshop-tested, cleaned, and certified before reaching our showroom floor.</p></div><div class="why-card"><div class="why-icon">&#129309;</div><h3>Transparent Pricing</h3><p>No hidden fees, no haggling. Fair market pricing backed by independent data.</p></div><div class="why-card"><div class="why-icon">&#128640;</div><h3>Quick Process</h3><p>From test drive to key handover in as little as 48 hours. Fast, efficient, seamless.</p></div></div></div></section>

<section id="contact" class="contact-section"><div class="container"><div class="sec-header"><div class="sec-label">Contact</div><div class="sec-title">Get In Touch</div><p class="sec-desc">Visit our showroom or book a private test drive today.</p></div><div class="contact-grid"><form class="contact-form" onsubmit="return false;"><input type="text" placeholder="Your Name" required><input type="email" placeholder="Your Email" required><input type="tel" placeholder="Phone Number"><textarea placeholder="Which vehicle are you interested in?"></textarea><button type="submit" class="form-submit">Send Message</button></form><div class="showroom-info"><h3>Showroom Details</h3><div class="info-item"><div class="info-icon">&#128205;</div><div><h4>Location</h4><p>{{address}}</p></div></div><div class="info-item"><div class="info-icon">&#128222;</div><div><h4>Phone</h4><p>{{phone}}</p></div></div><div class="info-item"><div class="info-icon">&#9993;</div><div><h4>Email</h4><p>{{email}}</p></div></div><div class="info-item"><div class="info-icon">&#128336;</div><div><h4>Showroom Hours</h4><p>{{hours}}</p></div></div></div></div></div></section>

<footer class="footer"><div class="container"><div class="footer-inner"><div class="footer-logo"><span>{{business_name}}</span></div><p>&copy; 2025 {{business_name}}. All Rights Reserved.</p></div></div></footer>

</body>
</html>`;

// ============================================================
// TEMPLATE 4: motorhub-garage.html
// Auto Repair / Garage Workshop — Dark Gray + Amber
// Fonts: Barlow
// ============================================================
const t4 = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="{{short_description}}">
<title>{{business_name}} — Auto Repair & Service</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
:root{--brand-primary:#f59e0b;--brand-secondary:#292524;--bg:#1c1917;--surface:#292524;--surface-2:#33302e;--text-light:#fafaf9;--text-muted:#a8a29e;--amber-glow:rgba(245,158,11,0.1);--border:rgba(255,255,255,0.06)}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html{scroll-behavior:smooth}
body{font-family:'Barlow',sans-serif;color:var(--text-muted);background:var(--bg);line-height:1.6}
a{text-decoration:none;color:inherit}img{max-width:100%;display:block}
.container{max-width:1100px;margin:0 auto;padding:0 24px}
.nav{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(28,25,23,0.94);backdrop-filter:blur(12px);border-bottom:1px solid var(--border)}
.nav-inner{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;max-width:1100px;margin:0 auto}
.nav-logo{font-size:1.3rem;font-weight:800;color:var(--text-light);text-transform:uppercase;letter-spacing:0.04em}
.nav-logo span{color:var(--brand-primary)}
.nav-links{display:flex;gap:26px;list-style:none}
.nav-links a{color:var(--text-muted);font-size:0.82rem;font-weight:500;transition:color 0.3s}
.nav-links a:hover{color:var(--brand-primary)}
.nav-cta{background:var(--brand-primary);color:var(--brand-secondary);padding:10px 22px;font-size:0.82rem;font-weight:700;border:none;border-radius:6px;cursor:pointer;transition:all 0.3s;text-transform:uppercase;letter-spacing:0.04em}
.nav-cta:hover{background:#d97706;transform:translateY(-1px)}
.menu-toggle{display:none}.hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;z-index:101}
.hamburger span{width:24px;height:2px;background:var(--brand-primary);transition:all 0.3s}
.hero{position:relative;min-height:90vh;display:flex;align-items:center;background:linear-gradient(135deg,rgba(28,25,23,0.92),rgba(28,25,23,0.6)),url('https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1920&q=80') center/cover no-repeat}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(transparent,var(--bg))}
.hero-content{position:relative;z-index:2;max-width:640px}
.hero-badge{display:inline-block;padding:8px 18px;background:var(--amber-glow);border:1px solid rgba(245,158,11,0.2);color:var(--brand-primary);font-size:0.7rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;border-radius:4px;margin-bottom:24px}
.hero h1{font-size:clamp(2.6rem,5vw,4.2rem);font-weight:900;color:var(--text-light);line-height:1.05;margin-bottom:16px;text-transform:uppercase;letter-spacing:-0.01em}
.hero h1 span{color:var(--brand-primary)}
.hero-slogan{font-size:1rem;color:var(--brand-primary);font-weight:600;margin-bottom:10px}
.hero-desc{font-size:0.95rem;margin-bottom:36px;max-width:480px;line-height:1.7}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap}
.btn-amber{background:var(--brand-primary);color:var(--brand-secondary);padding:15px 36px;font-size:0.85rem;font-weight:700;border:none;border-radius:8px;cursor:pointer;transition:all 0.3s;text-transform:uppercase;letter-spacing:0.04em}
.btn-amber:hover{background:#d97706;transform:translateY(-2px);box-shadow:0 8px 28px rgba(245,158,11,0.2)}
.btn-ghost{border:1.5px solid rgba(255,255,255,0.15);color:var(--text-light);padding:15px 36px;font-size:0.85rem;font-weight:600;border-radius:8px;transition:all 0.3s;background:transparent;cursor:pointer;text-transform:uppercase;letter-spacing:0.04em}
.btn-ghost:hover{border-color:var(--brand-primary);color:var(--brand-primary)}
.stats{position:relative;z-index:3;margin-top:-50px}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden}
.stat-item{padding:32px 16px;text-align:center;border-right:1px solid var(--border)}
.stat-item:last-child{border-right:none}
.stat-num{font-size:2rem;font-weight:900;color:var(--brand-primary)}
.stat-txt{font-size:0.7rem;text-transform:uppercase;letter-spacing:0.08em;margin-top:4px}
section{padding:80px 0}
.sec-label{font-size:0.68rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:var(--brand-primary);margin-bottom:8px}
.sec-title{font-size:clamp(1.8rem,2.5vw,2.4rem);font-weight:800;color:var(--text-light);margin-bottom:12px;text-transform:uppercase;letter-spacing:0.01em}
.sec-desc{font-size:0.92rem;max-width:520px;line-height:1.7}
.sec-header{text-align:center;margin-bottom:48px}.sec-header .sec-desc{margin:0 auto}
.about-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-top:40px}
.about-img{position:relative}
.about-img img{width:100%;border-radius:14px;aspect-ratio:4/3;object-fit:cover}
.about-img .exp-badge{position:absolute;top:20px;right:20px;background:var(--brand-primary);color:var(--brand-secondary);padding:14px 18px;border-radius:10px;text-align:center}
.exp-badge .num{font-size:1.8rem;font-weight:900;line-height:1}
.exp-badge .txt{font-size:0.6rem;text-transform:uppercase;letter-spacing:0.06em;font-weight:700}
.about-text p{margin-bottom:16px;font-size:0.92rem;line-height:1.75}
.about-checks{list-style:none;margin-top:20px}
.about-checks li{padding:8px 0 8px 28px;position:relative;font-size:0.88rem;font-weight:500;color:var(--text-light)}
.about-checks li::before{content:'\\2713';position:absolute;left:0;color:var(--brand-primary);font-weight:700}
.services-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.svc-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:28px;transition:all 0.3s;position:relative;overflow:hidden}
.svc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--brand-primary);transform:scaleX(0);transition:transform 0.3s;transform-origin:left}
.svc-card:hover::before{transform:scaleX(1)}
.svc-card:hover{border-color:rgba(245,158,11,0.2);transform:translateY(-4px)}
.svc-icon{font-size:1.8rem;margin-bottom:14px}
.svc-card h3{font-size:1rem;font-weight:700;color:var(--text-light);margin-bottom:6px;text-transform:uppercase;letter-spacing:0.02em}
.svc-card p{font-size:0.82rem;line-height:1.65;margin-bottom:8px}
.svc-price{font-weight:700;color:var(--brand-primary);font-size:0.88rem}
.trust-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.trust-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:32px 24px;text-align:center;transition:all 0.3s}
.trust-card:hover{border-color:rgba(245,158,11,0.2);transform:translateY(-4px)}
.trust-icon{font-size:2rem;margin-bottom:14px}
.trust-card h3{font-size:1rem;font-weight:700;color:var(--text-light);margin-bottom:8px;text-transform:uppercase}
.trust-card p{font-size:0.84rem;line-height:1.65}
.gallery-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:40px}
.gallery-item{position:relative;border-radius:12px;overflow:hidden;aspect-ratio:4/3;cursor:pointer}
.gallery-item img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s}
.gallery-item:hover img{transform:scale(1.1)}
.gallery-item::after{content:'';position:absolute;inset:0;background:rgba(28,25,23,0.2);transition:background 0.3s}
.gallery-item:hover::after{background:transparent}
.reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.review-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:28px}
.review-stars{color:var(--brand-primary);font-size:0.88rem;margin-bottom:12px;letter-spacing:2px}
.review-card p{font-size:0.88rem;color:var(--text-muted);line-height:1.7;font-style:italic;margin-bottom:14px}
.review-author{font-size:0.82rem;font-weight:700;color:var(--text-light)}
.review-vehicle{font-size:0.72rem;color:var(--text-muted);margin-top:2px}
.contact-section{padding:80px 0}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;margin-top:40px}
.contact-form{display:flex;flex-direction:column;gap:14px}
.contact-form input,.contact-form textarea{width:100%;padding:14px 18px;border:1px solid var(--border);border-radius:10px;font-family:'Barlow',sans-serif;font-size:0.88rem;outline:none;background:var(--surface);color:var(--text-light);transition:border-color 0.3s}
.contact-form input::placeholder,.contact-form textarea::placeholder{color:var(--text-muted)}
.contact-form input:focus,.contact-form textarea:focus{border-color:var(--brand-primary)}
.contact-form textarea{height:120px;resize:vertical}
.form-submit{background:var(--brand-primary);color:var(--brand-secondary);padding:14px 32px;border:none;font-size:0.85rem;font-weight:700;border-radius:10px;cursor:pointer;transition:all 0.3s;text-transform:uppercase;letter-spacing:0.04em;align-self:flex-start}
.form-submit:hover{background:#d97706}
.workshop-info{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:36px}
.workshop-info h3{font-size:1.2rem;font-weight:800;color:var(--text-light);margin-bottom:24px;text-transform:uppercase}
.info-item{display:flex;gap:14px;margin-bottom:20px}
.info-icon{width:42px;height:42px;background:var(--amber-glow);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0}
.info-item h4{font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin-bottom:2px}
.info-item p{font-size:0.9rem;color:var(--text-light)}
.cta-section{padding:60px 0}
.cta-box{background:linear-gradient(135deg,var(--brand-primary),#b45309);border-radius:20px;padding:56px 40px;text-align:center;color:var(--brand-secondary)}
.cta-box h2{font-size:clamp(1.6rem,2.5vw,2.2rem);font-weight:900;margin-bottom:12px;text-transform:uppercase}
.cta-box p{font-size:0.95rem;opacity:0.8;margin-bottom:28px;max-width:500px;margin-left:auto;margin-right:auto}
.cta-btn{background:var(--brand-secondary);color:var(--text-light);padding:14px 36px;font-size:0.85rem;font-weight:700;border:none;border-radius:8px;cursor:pointer;transition:all 0.3s;text-transform:uppercase;letter-spacing:0.04em;display:inline-block}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(0,0,0,0.3)}
.footer{padding:40px 0;text-align:center;border-top:1px solid var(--border)}
.footer-inner{display:flex;justify-content:space-between;align-items:center}
.footer-logo{font-size:1rem;font-weight:800;color:var(--text-light);text-transform:uppercase}
.footer-logo span{color:var(--brand-primary)}
.footer p{font-size:0.78rem}
@media(max-width:1024px){.services-grid{grid-template-columns:repeat(2,1fr)}.gallery-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.hamburger{display:flex}.nav-links,.nav-cta{display:none}.menu-toggle:checked~.nav-inner .nav-links{display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:var(--surface);padding:20px;gap:14px;border-bottom:1px solid var(--border)}.hero h1{font-size:2.4rem}.stats-grid{grid-template-columns:repeat(2,1fr)}.stat-item:nth-child(2){border-right:none}.about-grid,.contact-grid{grid-template-columns:1fr;gap:32px}.services-grid,.trust-grid,.reviews-grid{grid-template-columns:1fr}.gallery-grid{grid-template-columns:repeat(2,1fr)}.hero-btns{flex-direction:column;align-items:stretch;text-align:center}.footer-inner{flex-direction:column;gap:12px}}
</style>
</head>
<body>

<nav class="nav"><input type="checkbox" id="menu" class="menu-toggle" hidden><div class="nav-inner"><a href="#" class="nav-logo"><span>{{business_name}}</span></a><label for="menu" class="hamburger"><span></span><span></span><span></span></label><ul class="nav-links"><li><a href="#services">Services</a></li><li><a href="#gallery">Workshop</a></li><li><a href="#reviews">Reviews</a></li><li><a href="#contact">Contact</a></li></ul><a href="#contact" class="nav-cta">Book Now</a></div></nav>

<section class="hero"><div class="container"><div class="hero-content"><div class="hero-badge">Certified Mechanics</div><h1>YOUR CAR.<br><span>OUR EXPERTISE.</span></h1><p class="hero-slogan">{{slogan}}</p><p class="hero-desc">{{short_description}}</p><div class="hero-btns"><a href="#contact" class="btn-amber">Book an Appointment</a><a href="#services" class="btn-ghost">Our Services</a></div></div></div></section>

<div class="stats"><div class="container"><div class="stats-grid"><div class="stat-item"><div class="stat-num">8,500+</div><div class="stat-txt">Cars Serviced</div></div><div class="stat-item"><div class="stat-num">18</div><div class="stat-txt">Years Experience</div></div><div class="stat-item"><div class="stat-num">4.9</div><div class="stat-txt">Google Rating</div></div><div class="stat-item"><div class="stat-num">6</div><div class="stat-txt">Certified Mechanics</div></div></div></div></div>

<section id="about"><div class="container"><div class="sec-label">Our Story</div><div class="sec-title">Family-Owned Since 2007</div><div class="about-grid"><div class="about-img"><img src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80" alt="Workshop interior"><div class="exp-badge"><div class="num">18</div><div class="txt">Years Exp.</div></div></div><div class="about-text"><p>{{business_name}} started as a small family workshop with one goal: honest, quality car repair at fair prices. Today we serve thousands of customers each year with the same dedication.</p><p>All our mechanics are factory-certified and equipped with the latest diagnostic tools. We work on all makes and models, from daily commuters to performance vehicles.</p><ul class="about-checks"><li>Factory-certified mechanics for all brands</li><li>Genuine and OEM-quality replacement parts</li><li>Transparent pricing with no hidden costs</li><li>Courtesy vehicle available during major repairs</li><li>12-month warranty on all repairs</li></ul></div></div></div></section>

<section id="services"><div class="container"><div class="sec-header"><div class="sec-label">What We Do</div><div class="sec-title">Our Services</div><p class="sec-desc">Comprehensive auto care for every vehicle, every driver.</p></div><div class="services-grid"><div class="svc-card"><div class="svc-icon">&#128736;</div><h3>Full Service</h3><p>Complete vehicle inspection, oil change, filter replacement, brake check, fluid top-up.</p><div class="svc-price">From &euro;189</div></div><div class="svc-card"><div class="svc-icon">&#9881;</div><h3>Brake Repair</h3><p>Disc and pad replacement, brake fluid flush, caliper servicing, ABS diagnostics.</p><div class="svc-price">From &euro;149</div></div><div class="svc-card"><div class="svc-icon">&#128722;</div><h3>Tyres</h3><p>New tyre fitting, balancing, alignment, seasonal change, puncture repair.</p><div class="svc-price">From &euro;59</div></div><div class="svc-card"><div class="svc-icon">&#128187;</div><h3>Diagnostics</h3><p>Full electronic scan, fault code reading, engine management, sensor testing.</p><div class="svc-price">From &euro;79</div></div><div class="svc-card"><div class="svc-icon">&#10052;</div><h3>AC Service</h3><p>Gas recharge, leak detection, compressor check, cabin filter replacement.</p><div class="svc-price">From &euro;89</div></div><div class="svc-card"><div class="svc-icon">&#128663;</div><h3>Bodywork</h3><p>Dent removal, scratch repair, bumper respray, full panel restoration.</p><div class="svc-price">From &euro;199</div></div></div></div></section>

<section id="trust"><div class="container"><div class="sec-header"><div class="sec-label">Why Us</div><div class="sec-title">Why Trust {{business_name}}</div></div><div class="trust-grid"><div class="trust-card"><div class="trust-icon">&#128274;</div><h3>No Surprises</h3><p>We always call before doing extra work. You approve the cost before we start any repair.</p></div><div class="trust-card"><div class="trust-icon">&#128176;</div><h3>Fair Prices</h3><p>Competitive rates with honest assessments. We fix what needs fixing, nothing more.</p></div><div class="trust-card"><div class="trust-icon">&#128170;</div><h3>Guaranteed Work</h3><p>12-month warranty on all repairs. If something is not right, we make it right.</p></div></div></div></section>

<section id="gallery"><div class="container"><div class="sec-header"><div class="sec-label">Workshop</div><div class="sec-title">Our Facility</div></div><div class="gallery-grid"><div class="gallery-item"><img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&q=80" alt="Workshop bay"></div><div class="gallery-item"><img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=400&q=80" alt="Car on lift"></div><div class="gallery-item"><img src="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=400&q=80" alt="Tools"></div><div class="gallery-item"><img src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&q=80" alt="Engine work"></div></div></div></section>

<section id="reviews"><div class="container"><div class="sec-header"><div class="sec-label">Reviews</div><div class="sec-title">Customer Reviews</div></div><div class="reviews-grid"><div class="review-card"><div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>Excellent service every time. They always explain what needs doing and never push unnecessary work. Highly recommend.</p><div class="review-author">Thomas V.</div><div class="review-vehicle">Audi A4</div></div><div class="review-card"><div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>Fair pricing and honest mechanics. They spotted an issue before it became expensive. Saved me hundreds.</p><div class="review-author">Sophie M.</div><div class="review-vehicle">BMW 320d</div></div><div class="review-card"><div class="review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div><p>Quick turnaround on my brake job. Clean workshop, friendly staff, and they even washed my car before pickup!</p><div class="review-author">Jan D.</div><div class="review-vehicle">VW Golf</div></div></div></div></section>

<section id="contact" class="contact-section"><div class="container"><div class="sec-header"><div class="sec-label">Contact</div><div class="sec-title">Get In Touch</div><p class="sec-desc">Book your service online or give us a call.</p></div><div class="contact-grid"><form class="contact-form" onsubmit="return false;"><input type="text" placeholder="Your Name" required><input type="email" placeholder="Your Email" required><input type="tel" placeholder="Phone Number"><textarea placeholder="Describe your vehicle issue or service needed..."></textarea><button type="submit" class="form-submit">Send Message</button></form><div class="workshop-info"><h3>Workshop Info</h3><div class="info-item"><div class="info-icon">&#128205;</div><div><h4>Address</h4><p>{{address}}</p></div></div><div class="info-item"><div class="info-icon">&#128222;</div><div><h4>Phone</h4><p>{{phone}}</p></div></div><div class="info-item"><div class="info-icon">&#9993;</div><div><h4>Email</h4><p>{{email}}</p></div></div><div class="info-item"><div class="info-icon">&#128336;</div><div><h4>Workshop Hours</h4><p>{{hours}}</p></div></div></div></div></div></section>

<section class="cta-section"><div class="container"><div class="cta-box"><h2>Book Your Service Today</h2><p>Call us or drop by. No appointment needed for quick checks and tyre pressure.</p><a href="tel:{{phone}}" class="cta-btn">Call {{phone}}</a></div></div></section>

<footer class="footer"><div class="container"><div class="footer-inner"><div class="footer-logo"><span>{{business_name}}</span></div><p>&copy; 2025 {{business_name}}. All brands welcome.</p></div></div></footer>

</body>
</html>`;

// Write all templates
const templates = [
  { name: 'propertyvue-realty.html', content: t1 },
  { name: 'homefinder-agency.html', content: t2 },
  { name: 'autodrive-motors.html', content: t3 },
  { name: 'motorhub-garage.html', content: t4 },
];

templates.forEach((t, i) => {
  const fp = path.join(dir, t.name);
  fs.writeFileSync(fp, t.content, 'utf8');
  console.log(`${i+1}/4 ${t.name} written: ${t.content.length} chars`);
});

console.log('All 4 templates generated successfully.');
