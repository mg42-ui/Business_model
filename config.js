/* =====================================================================
   CLIENT CONFIG — edit THIS file (plus style.css colors) for each new
   business. Every page reads from here: names, phone numbers, links,
   address, and the Google/SEO info are all filled in automatically.
   ===================================================================== */

const BIZ = {
  // Shown everywhere the business name appears (page titles, hero, footer)
  name: "Business Name",
  city: "New York City",

  // Digits only for the phone (used in tel: links), display version for text
  phone: "2125550199",
  phoneDisplay: "(212) 555-0199",

  email: "hello@example.com",

  // Street address — used in the footer, contact page, and Google map
  addressLine1: "123 Main St",
  addressLine2: "New York, NY 10021",

  // Social — leave as "" to hide the button automatically
  instagram: "https://instagram.com/",

  // What kind of business this is, for Google (SEO). Common values:
  // "BarberShop", "NailSalon", "HairSalon", "Restaurant", "CafeOrCoffeeShop",
  // "AutoRepair", "Dentist", "LocalBusiness" (safe fallback for anything)
  schemaType: "LocalBusiness",

  // One-line description for search engines (shows under the Google result)
  seoDescription: "One sentence describing the business and what it offers.",
};

// Mark that JS is running (fade-in animations only activate with JS,
// so the site still fully works if someone has scripts disabled)
document.documentElement.classList.add("js");
