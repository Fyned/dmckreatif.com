import type { Editor } from "grapesjs";

/**
 * Register all custom blocks into a GrapesJS editor instance.
 * Blocks are organized by category: General, then industry-specific.
 */
export function registerCustomBlocks(editor: Editor): void {
  const bm = editor.BlockManager;

  // ─── GENERAL (LAYOUT) ─────────────────────────────────
  bm.add("hero-section", {
    label: "Hero Section",
    category: "Layout",
    content: `<section style="padding:80px 40px;text-align:center;background:#111;color:#fff;">
      <h1 style="font-size:3rem;font-weight:700;margin-bottom:16px;">Your Business Name</h1>
      <p style="font-size:1.125rem;opacity:0.8;max-width:600px;margin:0 auto 32px;">A short tagline that describes what you do and why customers love you.</p>
      <a href="#contact" style="display:inline-block;padding:14px 36px;background:#CDFF50;color:#111;font-weight:700;text-decoration:none;border-radius:4px;">Get Started</a>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="18" rx="2"/><line x1="6" y1="9" x2="18" y2="9"/><line x1="8" y1="13" x2="16" y2="13"/></svg>`,
  });

  bm.add("about-section", {
    label: "About Us",
    category: "Layout",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <div style="display:flex;gap:40px;align-items:center;flex-wrap:wrap;">
        <div style="flex:1;min-width:300px;">
          <img src="https://placehold.co/600x400/e2e8f0/475569?text=About+Us" alt="About us" style="width:100%;border-radius:8px;"/>
        </div>
        <div style="flex:1;min-width:300px;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:16px;">About Our Company</h2>
          <p style="font-size:1rem;line-height:1.7;color:#555;margin-bottom:16px;">We have been serving our community with dedication and excellence. Our team of experienced professionals is committed to delivering the highest quality service.</p>
          <p style="font-size:1rem;line-height:1.7;color:#555;">With years of expertise and a passion for what we do, we ensure every client receives personalized attention and outstanding results.</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>`,
  });

  bm.add("cta-section", {
    label: "Call to Action",
    category: "Layout",
    content: `<section style="padding:60px 40px;text-align:center;background:#CDFF50;color:#111;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;">Ready to Get Started?</h2>
      <p style="font-size:1.125rem;margin-bottom:24px;">Contact us today for a free consultation and quote.</p>
      <a href="#contact" style="display:inline-block;padding:14px 36px;background:#111;color:#fff;font-weight:700;text-decoration:none;border-radius:4px;">Contact Us Now</a>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/></svg>`,
  });

  bm.add("footer-section", {
    label: "Footer",
    category: "Layout",
    content: `<footer style="padding:40px;background:#111;color:#ccc;text-align:center;">
      <div style="max-width:1200px;margin:0 auto;">
        <p style="font-size:1.25rem;font-weight:700;color:#fff;margin-bottom:8px;">Your Business Name</p>
        <p style="font-size:0.875rem;margin-bottom:16px;">123 Main Street, City, Country &bull; +1 (555) 000-0000 &bull; info@yourbusiness.com</p>
        <div style="display:flex;justify-content:center;gap:16px;margin-bottom:16px;">
          <a href="#" style="color:#CDFF50;text-decoration:none;">Facebook</a>
          <a href="#" style="color:#CDFF50;text-decoration:none;">Instagram</a>
          <a href="#" style="color:#CDFF50;text-decoration:none;">LinkedIn</a>
        </div>
        <p style="font-size:0.75rem;opacity:0.6;">&copy; 2025 Your Business. All rights reserved.</p>
      </div>
    </footer>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="14" width="20" height="7" rx="1"/><line x1="6" y1="17.5" x2="18" y2="17.5"/></svg>`,
  });

  bm.add("contact-section", {
    label: "Contact Info",
    category: "Layout",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Get in Touch</h2>
      <div style="display:flex;gap:32px;flex-wrap:wrap;justify-content:center;">
        <div style="text-align:center;padding:24px;min-width:200px;">
          <p style="font-size:1.5rem;margin-bottom:8px;">📍</p>
          <p style="font-weight:600;">Address</p>
          <p style="color:#666;font-size:0.9rem;">123 Main Street, City</p>
        </div>
        <div style="text-align:center;padding:24px;min-width:200px;">
          <p style="font-size:1.5rem;margin-bottom:8px;">📞</p>
          <p style="font-weight:600;">Phone</p>
          <p style="color:#666;font-size:0.9rem;">+1 (555) 000-0000</p>
        </div>
        <div style="text-align:center;padding:24px;min-width:200px;">
          <p style="font-size:1.5rem;margin-bottom:8px;">✉️</p>
          <p style="font-weight:600;">Email</p>
          <p style="color:#666;font-size:0.9rem;">info@yourbusiness.com</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>`,
  });

  bm.add("stats-section", {
    label: "Statistics",
    category: "Layout",
    content: `<section style="padding:60px 40px;background:#f8f9fa;">
      <div style="display:flex;gap:32px;justify-content:center;flex-wrap:wrap;max-width:1000px;margin:0 auto;">
        <div style="text-align:center;min-width:150px;">
          <p style="font-size:2.5rem;font-weight:800;color:#111;">500+</p>
          <p style="color:#666;font-size:0.9rem;">Happy Clients</p>
        </div>
        <div style="text-align:center;min-width:150px;">
          <p style="font-size:2.5rem;font-weight:800;color:#111;">10+</p>
          <p style="color:#666;font-size:0.9rem;">Years Experience</p>
        </div>
        <div style="text-align:center;min-width:150px;">
          <p style="font-size:2.5rem;font-weight:800;color:#111;">1000+</p>
          <p style="color:#666;font-size:0.9rem;">Projects Done</p>
        </div>
        <div style="text-align:center;min-width:150px;">
          <p style="font-size:2.5rem;font-weight:800;color:#111;">24/7</p>
          <p style="color:#666;font-size:0.9rem;">Support</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>`,
  });

  bm.add("testimonials-section", {
    label: "Testimonials",
    category: "Layout",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">What Our Clients Say</h2>
      <div style="display:flex;gap:24px;flex-wrap:wrap;justify-content:center;">
        <div style="flex:1;min-width:280px;max-width:380px;padding:32px;border:1px solid #e5e7eb;border-radius:8px;">
          <p style="font-style:italic;color:#555;margin-bottom:16px;">"Excellent service and amazing results. Highly recommend!"</p>
          <p style="font-weight:600;">— John Smith</p>
          <p style="font-size:0.85rem;color:#888;">CEO, Company Inc.</p>
        </div>
        <div style="flex:1;min-width:280px;max-width:380px;padding:32px;border:1px solid #e5e7eb;border-radius:8px;">
          <p style="font-style:italic;color:#555;margin-bottom:16px;">"Professional, reliable, and truly exceptional quality."</p>
          <p style="font-weight:600;">— Sarah Johnson</p>
          <p style="font-size:0.85rem;color:#888;">Director, Tech Ltd.</p>
        </div>
        <div style="flex:1;min-width:280px;max-width:380px;padding:32px;border:1px solid #e5e7eb;border-radius:8px;">
          <p style="font-style:italic;color:#555;margin-bottom:16px;">"Transformed our business completely. Outstanding work!"</p>
          <p style="font-weight:600;">— Michael Brown</p>
          <p style="font-size:0.85rem;color:#888;">Owner, Local Business</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>`,
  });

  bm.add("faq-section", {
    label: "FAQ",
    category: "Layout",
    content: `<section style="padding:80px 40px;max-width:800px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Frequently Asked Questions</h2>
      <div style="border-top:1px solid #e5e7eb;">
        <div style="padding:20px 0;border-bottom:1px solid #e5e7eb;">
          <p style="font-weight:600;font-size:1.1rem;margin-bottom:8px;">What services do you offer?</p>
          <p style="color:#666;line-height:1.6;">We offer a comprehensive range of services tailored to meet your specific needs. Contact us for a detailed consultation.</p>
        </div>
        <div style="padding:20px 0;border-bottom:1px solid #e5e7eb;">
          <p style="font-weight:600;font-size:1.1rem;margin-bottom:8px;">How much does it cost?</p>
          <p style="color:#666;line-height:1.6;">Our pricing varies based on the scope of work. We provide transparent quotes after understanding your requirements.</p>
        </div>
        <div style="padding:20px 0;border-bottom:1px solid #e5e7eb;">
          <p style="font-weight:600;font-size:1.1rem;margin-bottom:8px;">How long does it take?</p>
          <p style="color:#666;line-height:1.6;">Timelines depend on the project complexity. We always provide a clear schedule before starting any work.</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  });

  // ─── RESTAURANT & CAFE ─────────────────────────────────
  bm.add("restaurant-menu", {
    label: "Menu List",
    category: "Restaurant",
    content: `<section style="padding:60px 40px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Our Menu</h2>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;">
        <div>
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #CDFF50;">Starters</h3>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>Caesar Salad</span><span style="font-weight:600;">€12</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>Bruschetta</span><span style="font-weight:600;">€10</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>Soup of the Day</span><span style="font-weight:600;">€8</span></div>
        </div>
        <div>
          <h3 style="font-size:1.25rem;font-weight:700;margin-bottom:16px;padding-bottom:8px;border-bottom:2px solid #CDFF50;">Main Course</h3>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>Grilled Salmon</span><span style="font-weight:600;">€24</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>Beef Tenderloin</span><span style="font-weight:600;">€28</span></div>
          <div style="display:flex;justify-content:space-between;margin-bottom:12px;"><span>Pasta Primavera</span><span style="font-weight:600;">€18</span></div>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>`,
  });

  bm.add("restaurant-reservation", {
    label: "Reservation Form",
    category: "Restaurant",
    content: `<section style="padding:60px 40px;background:#111;color:#fff;">
      <div style="max-width:600px;margin:0 auto;text-align:center;">
        <h2 style="font-size:2rem;font-weight:700;margin-bottom:8px;">Make a Reservation</h2>
        <p style="color:#999;margin-bottom:32px;">Book your table online — we look forward to welcoming you.</p>
        <form style="display:grid;gap:16px;">
          <input type="text" placeholder="Your Name" style="padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:4px;font-size:1rem;" />
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <input type="date" style="padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:4px;font-size:1rem;" />
            <input type="time" style="padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:4px;font-size:1rem;" />
          </div>
          <select style="padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:4px;font-size:1rem;">
            <option>2 Guests</option><option>3 Guests</option><option>4 Guests</option><option>5+ Guests</option>
          </select>
          <button type="submit" style="padding:14px;background:#CDFF50;color:#111;font-weight:700;border:none;border-radius:4px;font-size:1rem;cursor:pointer;">Reserve Now</button>
        </form>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  });

  bm.add("restaurant-chef", {
    label: "Chef Profile",
    category: "Restaurant",
    content: `<section style="padding:80px 40px;max-width:900px;margin:0 auto;">
      <div style="display:flex;gap:40px;align-items:center;flex-wrap:wrap;">
        <img src="https://placehold.co/400x400/1a1a1a/CDFF50?text=Chef" alt="Chef" style="width:300px;height:300px;object-fit:cover;border-radius:50%;flex-shrink:0;" />
        <div style="flex:1;min-width:280px;">
          <p style="color:#CDFF50;font-weight:600;text-transform:uppercase;font-size:0.85rem;margin-bottom:4px;">Head Chef</p>
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:16px;">Chef Jean-Pierre</h2>
          <p style="color:#555;line-height:1.7;">With over 15 years of culinary experience across Michelin-starred restaurants in Paris and Lyon, Chef Jean-Pierre brings a passion for fresh, local ingredients and innovative techniques to every dish.</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 13.87A4 4 0 017.41 6a5.11 5.11 0 011.05-1.54 5 5 0 017.08 0A5.11 5.11 0 0116.59 6 4 4 0 0118 13.87V21H6z"/></svg>`,
  });

  // ─── CONSTRUCTION & BUILDING ───────────────────────────
  bm.add("construction-services", {
    label: "Service Cards",
    category: "Construction",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Our Services</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="padding:32px;border:1px solid #e5e7eb;border-radius:8px;text-align:center;">
          <p style="font-size:2rem;margin-bottom:12px;">🏗️</p>
          <h3 style="font-weight:700;margin-bottom:8px;">New Construction</h3>
          <p style="color:#666;font-size:0.9rem;">Complete building projects from foundation to finishing, delivered on time and within budget.</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb;border-radius:8px;text-align:center;">
          <p style="font-size:2rem;margin-bottom:12px;">🔨</p>
          <h3 style="font-weight:700;margin-bottom:8px;">Renovation</h3>
          <p style="color:#666;font-size:0.9rem;">Transform your existing space with our expert renovation and remodeling services.</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb;border-radius:8px;text-align:center;">
          <p style="font-size:2rem;margin-bottom:12px;">📐</p>
          <h3 style="font-weight:700;margin-bottom:8px;">Architecture</h3>
          <p style="color:#666;font-size:0.9rem;">Professional architectural design and planning for residential and commercial projects.</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="8" rx="1"/><path d="M12 6V2"/><path d="M2 14v4a2 2 0 002 2h16a2 2 0 002-2v-4"/></svg>`,
  });

  bm.add("construction-projects", {
    label: "Project Gallery",
    category: "Construction",
    content: `<section style="padding:80px 40px;background:#f8f9fa;">
      <div style="max-width:1200px;margin:0 auto;">
        <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Our Projects</h2>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;">
          <div style="position:relative;overflow:hidden;border-radius:8px;">
            <img src="https://placehold.co/400x300/334155/fff?text=Project+1" alt="Modern villa residential construction project" style="width:100%;display:block;" />
            <div style="position:absolute;bottom:0;left:0;right:0;padding:16px;background:linear-gradient(transparent,rgba(0,0,0,0.8));color:#fff;">
              <p style="font-weight:600;">Modern Villa</p>
              <p style="font-size:0.8rem;opacity:0.8;">Residential — 2024</p>
            </div>
          </div>
          <div style="position:relative;overflow:hidden;border-radius:8px;">
            <img src="https://placehold.co/400x300/1e293b/fff?text=Project+2" alt="Commercial office complex construction project" style="width:100%;display:block;" />
            <div style="position:absolute;bottom:0;left:0;right:0;padding:16px;background:linear-gradient(transparent,rgba(0,0,0,0.8));color:#fff;">
              <p style="font-weight:600;">Office Complex</p>
              <p style="font-size:0.8rem;opacity:0.8;">Commercial — 2024</p>
            </div>
          </div>
          <div style="position:relative;overflow:hidden;border-radius:8px;">
            <img src="https://placehold.co/400x300/475569/fff?text=Project+3" alt="Industrial warehouse construction project" style="width:100%;display:block;" />
            <div style="position:absolute;bottom:0;left:0;right:0;padding:16px;background:linear-gradient(transparent,rgba(0,0,0,0.8));color:#fff;">
              <p style="font-weight:600;">Warehouse</p>
              <p style="font-size:0.8rem;opacity:0.8;">Industrial — 2023</p>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
  });

  bm.add("construction-certifications", {
    label: "Certifications",
    category: "Construction",
    content: `<section style="padding:60px 40px;max-width:1000px;margin:0 auto;text-align:center;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:32px;">Certifications & Standards</h2>
      <div style="display:flex;gap:32px;justify-content:center;flex-wrap:wrap;">
        <div style="padding:24px 32px;border:2px solid #e5e7eb;border-radius:8px;min-width:180px;">
          <p style="font-size:1.5rem;font-weight:800;color:#CDFF50;">ISO 9001</p>
          <p style="font-size:0.85rem;color:#666;">Quality Management</p>
        </div>
        <div style="padding:24px 32px;border:2px solid #e5e7eb;border-radius:8px;min-width:180px;">
          <p style="font-size:1.5rem;font-weight:800;color:#CDFF50;">CE</p>
          <p style="font-size:0.85rem;color:#666;">European Conformity</p>
        </div>
        <div style="padding:24px 32px;border:2px solid #e5e7eb;border-radius:8px;min-width:180px;">
          <p style="font-size:1.5rem;font-weight:800;color:#CDFF50;">RGE</p>
          <p style="font-size:0.85rem;color:#666;">Certified Green Builder</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 15l-3 3 1-4-3-2h4L12 8l1 4h4l-3 2 1 4z"/><circle cx="12" cy="12" r="10"/></svg>`,
  });

  // ─── BEAUTY & WELLNESS ─────────────────────────────────
  bm.add("beauty-services", {
    label: "Service Prices",
    category: "Beauty",
    content: `<section style="padding:80px 40px;max-width:900px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Our Services</h2>
      <div style="display:grid;gap:16px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border:1px solid #e5e7eb;border-radius:8px;">
          <div><p style="font-weight:600;">Haircut & Styling</p><p style="font-size:0.85rem;color:#888;">45 min</p></div>
          <span style="font-size:1.25rem;font-weight:700;">€45</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border:1px solid #e5e7eb;border-radius:8px;">
          <div><p style="font-weight:600;">Color Treatment</p><p style="font-size:0.85rem;color:#888;">90 min</p></div>
          <span style="font-size:1.25rem;font-weight:700;">€85</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border:1px solid #e5e7eb;border-radius:8px;">
          <div><p style="font-weight:600;">Facial Treatment</p><p style="font-size:0.85rem;color:#888;">60 min</p></div>
          <span style="font-size:1.25rem;font-weight:700;">€65</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border:1px solid #e5e7eb;border-radius:8px;">
          <div><p style="font-weight:600;">Full Body Massage</p><p style="font-size:0.85rem;color:#888;">75 min</p></div>
          <span style="font-size:1.25rem;font-weight:700;">€90</span>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`,
  });

  bm.add("beauty-team", {
    label: "Team Profiles",
    category: "Beauty",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Meet Our Team</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="text-align:center;">
          <img src="https://placehold.co/300x300/FFB5E8/333?text=Stylist" alt="Team member" style="width:200px;height:200px;border-radius:50%;object-fit:cover;margin:0 auto 16px;" />
          <h3 style="font-weight:600;margin-bottom:4px;">Sophie Martin</h3>
          <p style="color:#888;font-size:0.9rem;">Senior Stylist — 8 years</p>
        </div>
        <div style="text-align:center;">
          <img src="https://placehold.co/300x300/C4B5FD/333?text=Therapist" alt="Team member" style="width:200px;height:200px;border-radius:50%;object-fit:cover;margin:0 auto 16px;" />
          <h3 style="font-weight:600;margin-bottom:4px;">Emma Dubois</h3>
          <p style="color:#888;font-size:0.9rem;">Beauty Therapist — 5 years</p>
        </div>
        <div style="text-align:center;">
          <img src="https://placehold.co/300x300/67E8F9/333?text=Masseur" alt="Team member" style="width:200px;height:200px;border-radius:50%;object-fit:cover;margin:0 auto 16px;" />
          <h3 style="font-weight:600;margin-bottom:4px;">Lucas Bernard</h3>
          <p style="color:#888;font-size:0.9rem;">Massage Specialist — 6 years</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  });

  bm.add("beauty-booking", {
    label: "Booking Button",
    category: "Beauty",
    content: `<section style="padding:60px 40px;text-align:center;background:linear-gradient(135deg,#FFB5E8,#C4B5FD);color:#111;">
      <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;">Book Your Appointment</h2>
      <p style="margin-bottom:24px;max-width:500px;margin-left:auto;margin-right:auto;">Treat yourself to a moment of relaxation and beauty. Book online or call us directly.</p>
      <a href="#book" style="display:inline-block;padding:14px 40px;background:#111;color:#fff;font-weight:700;text-decoration:none;border-radius:40px;font-size:1rem;">Book Now</a>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><path d="M3 10h18"/><path d="M8 14h.01"/></svg>`,
  });

  // ─── LAW & LEGAL ───────────────────────────────────────
  bm.add("law-practice-areas", {
    label: "Practice Areas",
    category: "Legal",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Practice Areas</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="padding:32px;background:#f8f9fa;border-left:4px solid #C4B5FD;border-radius:0 8px 8px 0;">
          <h3 style="font-weight:700;margin-bottom:8px;">Corporate Law</h3>
          <p style="color:#666;font-size:0.9rem;">Business formation, mergers, acquisitions, and corporate governance expertise.</p>
        </div>
        <div style="padding:32px;background:#f8f9fa;border-left:4px solid #C4B5FD;border-radius:0 8px 8px 0;">
          <h3 style="font-weight:700;margin-bottom:8px;">Family Law</h3>
          <p style="color:#666;font-size:0.9rem;">Divorce, custody, adoption, and family mediation with compassion and discretion.</p>
        </div>
        <div style="padding:32px;background:#f8f9fa;border-left:4px solid #C4B5FD;border-radius:0 8px 8px 0;">
          <h3 style="font-weight:700;margin-bottom:8px;">Real Estate</h3>
          <p style="color:#666;font-size:0.9rem;">Property transactions, leasing, zoning, and construction law advisory services.</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3L2 9l10 6 10-6-10-6z"/><path d="M2 17l10 6 10-6"/><path d="M2 13l10 6 10-6"/></svg>`,
  });

  bm.add("law-attorney-profile", {
    label: "Attorney Profile",
    category: "Legal",
    content: `<section style="padding:80px 40px;max-width:900px;margin:0 auto;">
      <div style="display:flex;gap:40px;align-items:flex-start;flex-wrap:wrap;">
        <img src="https://placehold.co/350x420/1a1a1a/ccc?text=Attorney" alt="Attorney" style="width:300px;border-radius:8px;flex-shrink:0;" />
        <div style="flex:1;min-width:280px;">
          <p style="color:#C4B5FD;font-weight:600;text-transform:uppercase;font-size:0.85rem;margin-bottom:4px;">Managing Partner</p>
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:16px;">Me. Alexandre Durand</h2>
          <p style="color:#555;line-height:1.7;margin-bottom:16px;">Admitted to the Paris Bar in 2005, Me. Durand specializes in corporate law and international arbitration with over 18 years of experience advising multinational corporations.</p>
          <div style="display:flex;gap:16px;">
            <div><p style="font-size:1.5rem;font-weight:800;">18+</p><p style="font-size:0.8rem;color:#888;">Years Experience</p></div>
            <div><p style="font-size:1.5rem;font-weight:800;">500+</p><p style="font-size:0.8rem;color:#888;">Cases Won</p></div>
          </div>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  });

  // ─── MEDICAL & HEALTH ──────────────────────────────────
  bm.add("medical-departments", {
    label: "Departments",
    category: "Medical",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Our Departments</h2>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;">
        <div style="padding:24px;border:1px solid #e5e7eb;border-radius:8px;text-align:center;">
          <p style="font-size:2rem;margin-bottom:8px;">🫀</p>
          <h3 style="font-weight:600;font-size:0.95rem;">Cardiology</h3>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-radius:8px;text-align:center;">
          <p style="font-size:2rem;margin-bottom:8px;">🦷</p>
          <h3 style="font-weight:600;font-size:0.95rem;">Dental Care</h3>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-radius:8px;text-align:center;">
          <p style="font-size:2rem;margin-bottom:8px;">👁️</p>
          <h3 style="font-weight:600;font-size:0.95rem;">Ophthalmology</h3>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-radius:8px;text-align:center;">
          <p style="font-size:2rem;margin-bottom:8px;">🦴</p>
          <h3 style="font-weight:600;font-size:0.95rem;">Orthopedics</h3>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
  });

  bm.add("medical-doctor-profile", {
    label: "Doctor Profile",
    category: "Medical",
    content: `<section style="padding:80px 40px;max-width:900px;margin:0 auto;">
      <div style="display:flex;gap:40px;align-items:center;flex-wrap:wrap;">
        <img src="https://placehold.co/350x400/67E8F9/1a1a1a?text=Doctor" alt="Doctor" style="width:280px;border-radius:12px;flex-shrink:0;" />
        <div style="flex:1;min-width:280px;">
          <p style="color:#67E8F9;font-weight:600;font-size:0.85rem;text-transform:uppercase;margin-bottom:4px;">Chief Physician</p>
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;">Dr. Marie Laurent</h2>
          <p style="color:#555;line-height:1.7;margin-bottom:16px;">Board-certified cardiologist with 20 years of clinical experience. Specialized in preventive cardiology and non-invasive imaging.</p>
          <p style="font-size:0.9rem;color:#888;">MD, PhD — University of Paris, FESC</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>`,
  });

  bm.add("medical-appointment", {
    label: "Appointment Form",
    category: "Medical",
    content: `<section style="padding:60px 40px;background:#f0fdfa;">
      <div style="max-width:600px;margin:0 auto;text-align:center;">
        <h2 style="font-size:2rem;font-weight:700;margin-bottom:8px;">Book an Appointment</h2>
        <p style="color:#666;margin-bottom:32px;">Schedule your visit with one of our specialists.</p>
        <form style="display:grid;gap:16px;text-align:left;">
          <input type="text" placeholder="Full Name" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
          <input type="tel" placeholder="Phone Number" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
          <select style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;">
            <option>Select Department</option><option>Cardiology</option><option>Dental</option><option>Orthopedics</option>
          </select>
          <input type="date" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
          <button type="submit" style="padding:14px;background:#0d9488;color:#fff;font-weight:700;border:none;border-radius:6px;font-size:1rem;cursor:pointer;">Request Appointment</button>
        </form>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><path d="M3 10h18"/><path d="M9 16l2 2 4-4"/></svg>`,
  });

  // ─── E-COMMERCE ────────────────────────────────────────
  bm.add("ecommerce-products", {
    label: "Product Grid",
    category: "E-Commerce",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Featured Products</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x400/f8f9fa/475569?text=Product+1" alt="Featured product 1 showcase image" style="width:100%;" />
          <div style="padding:20px;">
            <h3 style="font-weight:600;margin-bottom:4px;">Product Name</h3>
            <p style="color:#666;font-size:0.85rem;margin-bottom:8px;">Short product description here.</p>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:1.25rem;font-weight:700;">€49.99</span>
              <button style="padding:8px 20px;background:#111;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Add to Cart</button>
            </div>
          </div>
        </div>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x400/f8f9fa/475569?text=Product+2" alt="Featured product 2 showcase image" style="width:100%;" />
          <div style="padding:20px;">
            <h3 style="font-weight:600;margin-bottom:4px;">Product Name</h3>
            <p style="color:#666;font-size:0.85rem;margin-bottom:8px;">Short product description here.</p>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:1.25rem;font-weight:700;">€39.99</span>
              <button style="padding:8px 20px;background:#111;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Add to Cart</button>
            </div>
          </div>
        </div>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x400/f8f9fa/475569?text=Product+3" alt="Featured product 3 showcase image" style="width:100%;" />
          <div style="padding:20px;">
            <h3 style="font-weight:600;margin-bottom:4px;">Product Name</h3>
            <p style="color:#666;font-size:0.85rem;margin-bottom:8px;">Short product description here.</p>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:1.25rem;font-weight:700;">€59.99</span>
              <button style="padding:8px 20px;background:#111;color:#fff;border:none;border-radius:4px;cursor:pointer;font-weight:600;">Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>`,
  });

  bm.add("ecommerce-features", {
    label: "Shop Features",
    category: "E-Commerce",
    content: `<section style="padding:60px 40px;background:#f8f9fa;">
      <div style="display:flex;gap:32px;justify-content:center;flex-wrap:wrap;max-width:1000px;margin:0 auto;">
        <div style="text-align:center;min-width:180px;">
          <p style="font-size:2rem;margin-bottom:8px;">🚚</p>
          <p style="font-weight:600;">Free Shipping</p>
          <p style="color:#666;font-size:0.85rem;">On orders over €50</p>
        </div>
        <div style="text-align:center;min-width:180px;">
          <p style="font-size:2rem;margin-bottom:8px;">🔒</p>
          <p style="font-weight:600;">Secure Payment</p>
          <p style="color:#666;font-size:0.85rem;">SSL encrypted checkout</p>
        </div>
        <div style="text-align:center;min-width:180px;">
          <p style="font-size:2rem;margin-bottom:8px;">↩️</p>
          <p style="font-weight:600;">Easy Returns</p>
          <p style="color:#666;font-size:0.85rem;">30-day return policy</p>
        </div>
        <div style="text-align:center;min-width:180px;">
          <p style="font-size:2rem;margin-bottom:8px;">💬</p>
          <p style="font-weight:600;">24/7 Support</p>
          <p style="color:#666;font-size:0.85rem;">Chat or email anytime</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  });

  // ─── REAL ESTATE ───────────────────────────────────────
  bm.add("realestate-listings", {
    label: "Property Cards",
    category: "Real Estate",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Featured Properties</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x260/86EFAC/1a1a1a?text=Property+1" alt="Property" style="width:100%;" />
          <div style="padding:20px;">
            <span style="display:inline-block;padding:4px 10px;background:#86EFAC;font-size:0.75rem;font-weight:600;border-radius:4px;margin-bottom:8px;">FOR SALE</span>
            <h3 style="font-weight:600;margin-bottom:4px;">Modern Apartment</h3>
            <p style="color:#888;font-size:0.85rem;margin-bottom:8px;">3 bed &bull; 2 bath &bull; 120 m&sup2;</p>
            <p style="font-size:1.25rem;font-weight:700;">€285,000</p>
          </div>
        </div>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x260/86EFAC/1a1a1a?text=Property+2" alt="Property" style="width:100%;" />
          <div style="padding:20px;">
            <span style="display:inline-block;padding:4px 10px;background:#FCD34D;font-size:0.75rem;font-weight:600;border-radius:4px;margin-bottom:8px;">FOR RENT</span>
            <h3 style="font-weight:600;margin-bottom:4px;">Family House</h3>
            <p style="color:#888;font-size:0.85rem;margin-bottom:8px;">4 bed &bull; 3 bath &bull; 200 m&sup2;</p>
            <p style="font-size:1.25rem;font-weight:700;">€1,800/mo</p>
          </div>
        </div>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x260/86EFAC/1a1a1a?text=Property+3" alt="Property" style="width:100%;" />
          <div style="padding:20px;">
            <span style="display:inline-block;padding:4px 10px;background:#86EFAC;font-size:0.75rem;font-weight:600;border-radius:4px;margin-bottom:8px;">FOR SALE</span>
            <h3 style="font-weight:600;margin-bottom:4px;">Studio Loft</h3>
            <p style="color:#888;font-size:0.85rem;margin-bottom:8px;">1 bed &bull; 1 bath &bull; 55 m&sup2;</p>
            <p style="font-size:1.25rem;font-weight:700;">€145,000</p>
          </div>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  });

  // ─── AUTOMOTIVE ────────────────────────────────────────
  bm.add("auto-vehicle-cards", {
    label: "Vehicle Cards",
    category: "Automotive",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Our Vehicles</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x260/1a1a1a/F87171?text=Car+1" alt="Vehicle" style="width:100%;" />
          <div style="padding:20px;">
            <h3 style="font-weight:600;margin-bottom:4px;">Sedan Deluxe</h3>
            <p style="color:#888;font-size:0.85rem;margin-bottom:8px;">2024 &bull; Automatic &bull; 15,000 km</p>
            <p style="font-size:1.25rem;font-weight:700;">€32,500</p>
          </div>
        </div>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x260/1a1a1a/F87171?text=Car+2" alt="Vehicle" style="width:100%;" />
          <div style="padding:20px;">
            <h3 style="font-weight:600;margin-bottom:4px;">SUV Sport</h3>
            <p style="color:#888;font-size:0.85rem;margin-bottom:8px;">2023 &bull; Automatic &bull; 28,000 km</p>
            <p style="font-size:1.25rem;font-weight:700;">€45,900</p>
          </div>
        </div>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <img src="https://placehold.co/400x260/1a1a1a/F87171?text=Car+3" alt="Vehicle" style="width:100%;" />
          <div style="padding:20px;">
            <h3 style="font-weight:600;margin-bottom:4px;">Electric Compact</h3>
            <p style="color:#888;font-size:0.85rem;margin-bottom:8px;">2024 &bull; Electric &bull; 5,000 km</p>
            <p style="font-size:1.25rem;font-weight:700;">€28,900</p>
          </div>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17a2 2 0 100-4 2 2 0 000 4z"/><path d="M17 17a2 2 0 100-4 2 2 0 000 4z"/><path d="M5 17H3v-6l2-5h10l4 5h2v6h-2"/><path d="M5 12h14"/></svg>`,
  });

  // ─── EDUCATION ─────────────────────────────────────────
  bm.add("education-courses", {
    label: "Course Cards",
    category: "Education",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Our Courses</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <div style="background:#818CF8;padding:32px;text-align:center;">
            <p style="font-size:2.5rem;">📚</p>
          </div>
          <div style="padding:20px;">
            <span style="font-size:0.75rem;font-weight:600;color:#818CF8;">BEGINNER</span>
            <h3 style="font-weight:600;margin:4px 0 8px;">Introduction to Programming</h3>
            <p style="color:#666;font-size:0.85rem;margin-bottom:12px;">12 weeks &bull; Online &bull; Certificate</p>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:700;">€299</span>
              <a href="#" style="color:#818CF8;font-weight:600;text-decoration:none;font-size:0.9rem;">Enroll &rarr;</a>
            </div>
          </div>
        </div>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <div style="background:#818CF8;padding:32px;text-align:center;">
            <p style="font-size:2.5rem;">🎨</p>
          </div>
          <div style="padding:20px;">
            <span style="font-size:0.75rem;font-weight:600;color:#818CF8;">INTERMEDIATE</span>
            <h3 style="font-weight:600;margin:4px 0 8px;">Digital Design Masterclass</h3>
            <p style="color:#666;font-size:0.85rem;margin-bottom:12px;">8 weeks &bull; Hybrid &bull; Certificate</p>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:700;">€449</span>
              <a href="#" style="color:#818CF8;font-weight:600;text-decoration:none;font-size:0.9rem;">Enroll &rarr;</a>
            </div>
          </div>
        </div>
        <div style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
          <div style="background:#818CF8;padding:32px;text-align:center;">
            <p style="font-size:2.5rem;">💼</p>
          </div>
          <div style="padding:20px;">
            <span style="font-size:0.75rem;font-weight:600;color:#818CF8;">ADVANCED</span>
            <h3 style="font-weight:600;margin:4px 0 8px;">Business Leadership MBA</h3>
            <p style="color:#666;font-size:0.85rem;margin-bottom:12px;">24 weeks &bull; In-person &bull; Diploma</p>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:700;">€1,299</span>
              <a href="#" style="color:#818CF8;font-weight:600;text-decoration:none;font-size:0.9rem;">Enroll &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></svg>`,
  });

  // ─── TECHNOLOGY & SAAS ─────────────────────────────────
  bm.add("tech-pricing-table", {
    label: "Pricing Table",
    category: "Technology",
    content: `<section style="padding:80px 40px;max-width:1100px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Choose Your Plan</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="padding:32px;border:1px solid #e5e7eb;border-radius:12px;text-align:center;">
          <h3 style="font-weight:700;margin-bottom:8px;">Starter</h3>
          <p style="font-size:2.5rem;font-weight:800;margin-bottom:4px;">€9<span style="font-size:1rem;color:#888;">/mo</span></p>
          <p style="color:#888;font-size:0.85rem;margin-bottom:24px;">Perfect for individuals</p>
          <div style="text-align:left;space-y:8px;margin-bottom:24px;">
            <p style="padding:4px 0;">&#10003; 5 Projects</p>
            <p style="padding:4px 0;">&#10003; 1 GB Storage</p>
            <p style="padding:4px 0;">&#10003; Email Support</p>
          </div>
          <a href="#" style="display:block;padding:12px;border:2px solid #111;border-radius:8px;text-decoration:none;color:#111;font-weight:600;">Get Started</a>
        </div>
        <div style="padding:32px;border:2px solid #38BDF8;border-radius:12px;text-align:center;position:relative;">
          <span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#38BDF8;color:#fff;padding:4px 16px;border-radius:20px;font-size:0.75rem;font-weight:700;">POPULAR</span>
          <h3 style="font-weight:700;margin-bottom:8px;">Pro</h3>
          <p style="font-size:2.5rem;font-weight:800;margin-bottom:4px;">€29<span style="font-size:1rem;color:#888;">/mo</span></p>
          <p style="color:#888;font-size:0.85rem;margin-bottom:24px;">For growing teams</p>
          <div style="text-align:left;margin-bottom:24px;">
            <p style="padding:4px 0;">&#10003; Unlimited Projects</p>
            <p style="padding:4px 0;">&#10003; 50 GB Storage</p>
            <p style="padding:4px 0;">&#10003; Priority Support</p>
            <p style="padding:4px 0;">&#10003; Analytics</p>
          </div>
          <a href="#" style="display:block;padding:12px;background:#38BDF8;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">Get Started</a>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb;border-radius:12px;text-align:center;">
          <h3 style="font-weight:700;margin-bottom:8px;">Enterprise</h3>
          <p style="font-size:2.5rem;font-weight:800;margin-bottom:4px;">€99<span style="font-size:1rem;color:#888;">/mo</span></p>
          <p style="color:#888;font-size:0.85rem;margin-bottom:24px;">For large organizations</p>
          <div style="text-align:left;margin-bottom:24px;">
            <p style="padding:4px 0;">&#10003; Everything in Pro</p>
            <p style="padding:4px 0;">&#10003; Unlimited Storage</p>
            <p style="padding:4px 0;">&#10003; Dedicated Support</p>
            <p style="padding:4px 0;">&#10003; Custom Integrations</p>
          </div>
          <a href="#" style="display:block;padding:12px;border:2px solid #111;border-radius:8px;text-decoration:none;color:#111;font-weight:600;">Contact Sales</a>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>`,
  });

  // ─── FORMS (CONTACT / BOOKING) ────────────────────────
  bm.add("contact-form", {
    label: "Contact Form",
    category: "Forms",
    content: `<section style="padding:80px 40px;max-width:700px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:8px;">Contact Us</h2>
      <p style="text-align:center;color:#666;margin-bottom:32px;">Have a question? Send us a message and we will get back to you shortly.</p>
      <form data-dmc-form="contact" style="display:grid;gap:16px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
          <input type="text" name="name" placeholder="Your Name" required style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
          <input type="email" name="email" placeholder="Email Address" required style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
        </div>
        <input type="text" name="phone" placeholder="Phone (optional)" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
        <input type="text" name="subject" placeholder="Subject" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
        <textarea name="message" rows="5" placeholder="Your Message" required style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;resize:vertical;"></textarea>
        <div style="position:absolute;left:-9999px;" aria-hidden="true"><input type="text" name="website_url_hp" tabindex="-1" autocomplete="off" /></div>
        <button type="submit" style="padding:14px;background:#111;color:#fff;font-weight:700;border:none;border-radius:6px;font-size:1rem;cursor:pointer;">Send Message</button>
      </form>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  });

  bm.add("contact-form-dark", {
    label: "Contact Form (Dark)",
    category: "Forms",
    content: `<section style="padding:80px 40px;background:#111;color:#fff;">
      <div style="max-width:700px;margin:0 auto;">
        <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:8px;">Get in Touch</h2>
        <p style="text-align:center;color:#999;margin-bottom:32px;">Fill out the form below and we will respond within 24 hours.</p>
        <form data-dmc-form="contact" style="display:grid;gap:16px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <input type="text" name="name" placeholder="Full Name" required style="padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:6px;font-size:1rem;" />
            <input type="email" name="email" placeholder="Email Address" required style="padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:6px;font-size:1rem;" />
          </div>
          <input type="tel" name="phone" placeholder="Phone Number" style="padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:6px;font-size:1rem;" />
          <textarea name="message" rows="5" placeholder="Your Message" required style="padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:6px;font-size:1rem;resize:vertical;"></textarea>
          <div style="position:absolute;left:-9999px;" aria-hidden="true"><input type="text" name="website_url_hp" tabindex="-1" autocomplete="off" /></div>
          <button type="submit" style="padding:14px;background:#CDFF50;color:#111;font-weight:700;border:none;border-radius:6px;font-size:1rem;cursor:pointer;">Send Message</button>
        </form>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
  });

  bm.add("quote-request-form", {
    label: "Quote Request",
    category: "Forms",
    content: `<section style="padding:80px 40px;background:#f8f9fa;">
      <div style="max-width:700px;margin:0 auto;">
        <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:8px;">Request a Free Quote</h2>
        <p style="text-align:center;color:#666;margin-bottom:32px;">Tell us about your project and we will send you a detailed estimate.</p>
        <form data-dmc-form="quote" style="display:grid;gap:16px;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <input type="text" name="name" placeholder="Your Name" required style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
            <input type="email" name="email" placeholder="Email Address" required style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
            <input type="tel" name="phone" placeholder="Phone Number" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;" />
            <select name="service" style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;">
              <option value="">Select Service</option>
              <option value="web-design">Web Design</option>
              <option value="renovation">Renovation</option>
              <option value="consulting">Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>
          <textarea name="message" rows="4" placeholder="Describe your project..." required style="padding:12px 16px;border:1px solid #d1d5db;border-radius:6px;font-size:1rem;resize:vertical;"></textarea>
          <div style="position:absolute;left:-9999px;" aria-hidden="true"><input type="text" name="website_url_hp" tabindex="-1" autocomplete="off" /></div>
          <button type="submit" style="padding:14px;background:#CDFF50;color:#111;font-weight:700;border:none;border-radius:6px;font-size:1rem;cursor:pointer;">Get My Free Quote</button>
        </form>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  });

  bm.add("newsletter-form", {
    label: "Newsletter Signup",
    category: "Forms",
    content: `<section style="padding:60px 40px;background:#111;color:#fff;text-align:center;">
      <div style="max-width:500px;margin:0 auto;">
        <h2 style="font-size:1.75rem;font-weight:700;margin-bottom:8px;">Stay Updated</h2>
        <p style="color:#999;margin-bottom:24px;">Subscribe to our newsletter for the latest news and exclusive offers.</p>
        <form data-dmc-form="newsletter" style="display:flex;gap:8px;">
          <input type="email" name="email" placeholder="Enter your email" required style="flex:1;padding:12px 16px;border:1px solid #333;background:#222;color:#fff;border-radius:6px;font-size:1rem;" />
          <div style="position:absolute;left:-9999px;" aria-hidden="true"><input type="text" name="website_url_hp" tabindex="-1" autocomplete="off" /></div>
          <button type="submit" style="padding:12px 24px;background:#CDFF50;color:#111;font-weight:700;border:none;border-radius:6px;font-size:1rem;cursor:pointer;white-space:nowrap;">Subscribe</button>
        </form>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/><line x1="10" y1="14" x2="2" y2="20"/><line x1="14" y1="14" x2="22" y2="20"/></svg>`,
  });

  bm.add("tech-feature-grid", {
    label: "Feature Grid",
    category: "Technology",
    content: `<section style="padding:80px 40px;max-width:1200px;margin:0 auto;">
      <h2 style="font-size:2rem;font-weight:700;text-align:center;margin-bottom:40px;">Why Choose Us</h2>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
        <div style="padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
          <p style="font-size:2rem;margin-bottom:12px;">⚡</p>
          <h3 style="font-weight:700;margin-bottom:8px;">Lightning Fast</h3>
          <p style="color:#666;font-size:0.9rem;line-height:1.6;">Built for speed with edge computing and optimized infrastructure worldwide.</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
          <p style="font-size:2rem;margin-bottom:12px;">🔐</p>
          <h3 style="font-weight:700;margin-bottom:8px;">Enterprise Security</h3>
          <p style="color:#666;font-size:0.9rem;line-height:1.6;">SOC 2 compliant with end-to-end encryption and advanced access controls.</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
          <p style="font-size:2rem;margin-bottom:12px;">📊</p>
          <h3 style="font-weight:700;margin-bottom:8px;">Advanced Analytics</h3>
          <p style="color:#666;font-size:0.9rem;line-height:1.6;">Real-time dashboards and customizable reports to track every metric that matters.</p>
        </div>
      </div>
    </section>`,
    media: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>`,
  });
}
