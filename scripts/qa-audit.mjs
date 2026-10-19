import fs from "node:fs";
import path from "node:path";

function runAudit() {
  const results = [];
  let failedCount = 0;

  function assert(condition, message) {
    if (condition) {
      results.push(`✓ [PASS] ${message}`);
    } else {
      results.push(`✗ [FAIL] ${message}`);
      failedCount++;
    }
  }

  console.log("=== Starting QA Comprehensive Audit ===\n");

  // 1. Check generated HTML artifacts
  const indexPath = path.join(process.cwd(), ".next/server/app/index.html");
  const myworksPath = path.join(process.cwd(), ".next/server/app/myworks.html");
  const playPath = path.join(process.cwd(), ".next/server/app/play.html");
  const sitemapPath = path.join(process.cwd(), ".next/server/app/sitemap.xml.body");
  const robotsPath = path.join(process.cwd(), ".next/server/app/robots.txt.body");

  assert(fs.existsSync(indexPath), "index.html is generated in .next/server/app/");
  assert(fs.existsSync(myworksPath), "myworks.html is generated in .next/server/app/");
  assert(fs.existsSync(playPath), "play.html is generated in .next/server/app/");
  assert(fs.existsSync(sitemapPath), "sitemap.xml is generated");
  assert(fs.existsSync(robotsPath), "robots.txt is generated");

  const indexHtml = fs.readFileSync(indexPath, "utf-8");
  const myworksHtml = fs.readFileSync(myworksPath, "utf-8");
  const playHtml = fs.readFileSync(playPath, "utf-8");
  const sitemapXml = fs.readFileSync(sitemapPath, "utf-8");
  const robotsTxt = fs.readFileSync(robotsPath, "utf-8");

  // 2. SEO & Metadata Verification
  assert(indexHtml.includes('<html lang="en"'), 'HTML lang attribute is "en"');
  assert(indexHtml.includes("Duch Panhathun"), "Duch Panhathun name present in index.html");
  assert(indexHtml.includes("application/ld+json"), "Person JSON-LD schema is present");
  assert(indexHtml.includes("viewport"), "Viewport meta tag is present");

  // 3. Section Anchor Verification in index.html
  const navSectionIds = ["landingDiv", "about", "disciplines", "work", "experience", "tech-stack", "research", "credentials", "cta", "contact"];
  for (const id of navSectionIds) {
    const hasId = indexHtml.includes(`id="${id}"`);
    assert(hasId, `Section anchor id="${id}" exists in index.html`);
  }

  // 4. Header & Nav links anchor check
  const headerAnchors = ["#about", "#work", "#experience", "#contact", "/myworks", "/play"];
  for (const a of headerAnchors) {
    assert(indexHtml.includes(a), `Navigation contains link to ${a}`);
  }

  // 5. Redoyan-Style Design Elements Verification
  assert(indexHtml.includes("what-corner"), "Corner crosshairs (what-corner) are rendered");
  assert(indexHtml.includes("landing-circle1"), "Ambient glowing orb 1 is rendered");
  assert(indexHtml.includes("landing-circle2"), "Ambient glowing orb 2 is rendered");
  assert(indexHtml.includes("nav-top-fade"), "Top navigation fade gradient is rendered");
  assert(indexHtml.includes("DUCH"), "Display typography DUCH is rendered");
  assert(indexHtml.includes("PANHATHUN"), "Display typography PANHATHUN is rendered");

  // 6. Cinematic Loading Screen Verification
  assert(indexHtml.includes('role="dialog"'), "LoadingScreen modal dialog element exists");
  assert(indexHtml.includes('aria-label="Portfolio loading screen"'), "LoadingScreen has accessible aria-label");
  assert(indexHtml.includes("Obsidian Cinematic Preloader") || indexHtml.includes("Cinematic Aperture"), "LoadingScreen header renders cinematic preloader badge");
  assert(indexHtml.includes("INITIALIZING RUNTIME"), "LoadingScreen dynamic telemetry lines rendered");
  assert(indexHtml.includes("SKIP"), "LoadingScreen skip button rendered");

  // 7. Signature Dual-Pill CTASection Verification
  assert(indexHtml.includes("Play With Me"), "CTASection dual-pill button 'Play With Me' rendered");
  assert(indexHtml.includes('href="/play"'), "CTASection links directly to /play route");
  assert(indexHtml.includes("Hire Me / Get in Touch"), "CTASection dual-pill button 'Hire Me' rendered");
  assert(indexHtml.includes('href="#contact"'), "CTASection links directly to #contact");
  assert(indexHtml.includes("READY TO") && indexHtml.includes("COLLABORATE"), "CTASection headline rendered");

  // 8. Devicon SVGs in TechStack
  assert(indexHtml.includes("devicon"), "TechStack inverted pyramid renders Devicon SVG assets");
  assert(indexHtml.includes("PyTorch") || indexHtml.includes("pytorch"), "PyTorch is included in TechStack");
  assert(indexHtml.includes("TypeScript") || indexHtml.includes("typescript"), "TypeScript is included in TechStack");

  // 9. /myworks Catalog Page Verification
  assert(myworksHtml.includes("All Works"), "All Works title rendered on /myworks");
  assert(myworksHtml.includes("Back to Home") || myworksHtml.includes("Back to Portfolio"), "Back to Home link rendered on /myworks");
  assert(myworksHtml.includes("Ailsa Grant Platform") || myworksHtml.includes("Ailsa"), "Ailsa project present in /myworks");
  assert(myworksHtml.includes("Thun Murex") || myworksHtml.includes("thun-murex"), "Thun Murex open source project present in /myworks");

  // 10. /play Creative Playground Page Verification
  assert(playHtml.includes("Interactive Creative Playground"), "/play metadata title rendered");
  assert(playHtml.includes("Interactive generative physics simulation canvas"), "Canvas physics element rendered on /play");
  assert(playHtml.includes("Constellation"), "Simulation mode 'Constellation' button rendered");
  assert(playHtml.includes("Repulsion"), "Simulation mode 'Repulsion' button rendered");
  assert(playHtml.includes("Gravity"), "Simulation mode 'Gravity' button rendered");
  assert(playHtml.includes("Vortex"), "Simulation mode 'Vortex' button rendered");
  assert(playHtml.includes("Wave Field"), "Simulation mode 'Wave Field' button rendered");
  assert(playHtml.includes("Back to Portfolio"), "Back to Portfolio navigation link rendered on /play");
  assert(playHtml.includes("Discrete Physics Model"), "Physics documentation rendered on /play");

  // 11. Sitemap validation
  assert(sitemapXml.includes("/myworks"), "sitemap.xml indexes /myworks route");
  assert(sitemapXml.includes("/play"), "sitemap.xml indexes /play route");
  assert(sitemapXml.includes("https://duchpanhathun.com"), "sitemap.xml has canonical domain");

  // 12. Robots.txt validation
  assert(robotsTxt.includes("User-Agent: *") || robotsTxt.includes("User-agent: *"), "robots.txt specifies User-Agent: *");
  assert(robotsTxt.includes("Allow: /"), "robots.txt allows root path");

  // 13. Check CSS Tokens in globals.css
  const cssContent = fs.readFileSync(path.join(process.cwd(), "src/app/globals.css"), "utf-8");
  assert(cssContent.includes("--color-bg: #0b080c"), "Obsidian background #0b080c token defined");
  assert(cssContent.includes("--color-accent: #c2a4ff"), "Lavender accent #c2a4ff token defined");
  assert(cssContent.includes("--cWidth"), "--cWidth responsive layout variable defined");
  assert(cssContent.includes(".hover-link"), "hover-link kinetic slide reveal defined");
  assert(cssContent.includes(".what-corner"), "what-corner crosshair CSS rules defined");

  // 14. Animation Timing & Delay Pacing Verification
  const loadingScreenSource = fs.readFileSync(path.join(process.cwd(), "src/components/ui/LoadingScreen.tsx"), "utf-8");
  assert(loadingScreenSource.includes("const duration = 3500;"), "LoadingScreen kinetic counter duration calibrated to 3.5s");
  assert(loadingScreenSource.includes("750"), "LoadingScreen includes 750ms dwell hold upon reaching 100% / READY");
  assert(loadingScreenSource.includes("850"), "LoadingScreen includes 850ms dismissal unmount delay");
  assert(loadingScreenSource.includes("duration-800"), "LoadingScreen shutter transition calibrated to 800ms duration");
  assert(loadingScreenSource.includes("p < 32"), "LoadingScreen telemetry step 1 threshold calibrated to 32%");
  assert(loadingScreenSource.includes("p < 72"), "LoadingScreen telemetry step 2 threshold calibrated to 72%");

  const heroSource = fs.readFileSync(path.join(process.cwd(), "src/components/sections/Hero.tsx"), "utf-8");
  assert(heroSource.includes("3600"), "Hero role carousel interval tuned to 3600ms");
  assert(heroSource.includes("400"), "Hero role animation transition calibrated to 400ms");

  console.log(results.join("\n"));
  console.log(`\nTotal tests: ${results.length}, Failures: ${failedCount}`);

  if (failedCount > 0) {
    process.exit(1);
  } else {
    console.log("\nAll QA audit checks passed successfully!");
  }
}

runAudit();
