/* =============================================================
   Ronnie Balonon — Portfolio
   Builds the shared header + footer, then wires up all
   interactions (mobile menu, dropdowns, active links,
   scroll reveals, back-to-top).
   ============================================================= */
(function () {
  "use strict";

  /* ---- Site data ---------------------------------------------------- */
  var CONTACT = {
    phone: "0543763091",
    phoneHref: "tel:+971543763091",
    email: "ronniebalonon1996@gmail.com",
    whatsapp: "971543763091",
    whatsappHref: "https://wa.me/971543763091?text=" +
      encodeURIComponent("Hi Ronnie, I found your portfolio and I'd like to discuss a design project.")
  };

  var NAV = [
    { label: "About Me", href: "/about/" },
    { label: "Graphic Design", href: "/graphic-design-portfolio/" },
    {
      label: "Other Expertise",
      href: "/other-expertise/",
      children: [
        { label: "Web Design", href: "/web-design/" },
        { label: "Photography", href: "/photography/" },
        { label: "Video Editing", href: "/video-editing/" },
        { label: "Artificial Intelligence", href: "/artificial-intelligence/" },
        { label: "Social Media", href: "/social-media/" }
      ]
    },
    {
      label: "Portfolio",
      href: "/portfolio/",
      children: [
        { label: "Graphic Design", href: "/portfolio/#graphic-design" },
        { label: "Social Media", href: "/portfolio/#social-media" },
        { label: "Web Design", href: "/portfolio/#web-design" },
        { label: "Artificial Intelligence", href: "/portfolio/#artificial-intelligence" },
        { label: "Photography", href: "/portfolio/#photography" },
        { label: "Video Editing", href: "/portfolio/#video-editing" }
      ]
    }
  ];

  /* ---- SVG icon helpers --------------------------------------------- */
  var ICON = {
    caret: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>',
    mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-10 6L2 7"></path></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"></line></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"></path></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.4 2.3 1.9 3.9 4 4.2v2.8c-1.5.1-2.9-.4-4.1-1.2v6.3a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.9c-.3-.1-.6-.2-.9-.2a2.7 2.7 0 1 0 2.7 2.7V3h3z"></path></svg>',
    top: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"></polyline></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.523 5.26l-.999 3.648 3.965-1.039zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',
    ai: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.9 4.6L18.5 9.5 13.9 11.4 12 16l-1.9-4.6L5.5 9.5l4.6-1.9z"/><path d="M19 14l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>'
  };

  /* ---- Determine current page --------------------------------------- */
  function currentPath() {
    var p = window.location.pathname.replace(/index\.html$/, "");
    if (p.charAt(0) !== "/") p = "/" + p;
    if (p.charAt(p.length - 1) !== "/") p += "/";
    return p;
  }
  var here = currentPath();

  function basePath(href) { return href.split("#")[0]; }

  function isActive(item) {
    if (basePath(item.href) === here) return true;
    if (item.children) {
      for (var i = 0; i < item.children.length; i++) {
        if (basePath(item.children[i].href) === here) return true;
      }
    }
    return false;
  }

  /* ---- Build header -------------------------------------------------- */
  function buildHeader() {
    var menu = "";
    NAV.forEach(function (item, idx) {
      var active = isActive(item) ? " active" : "";
      var aria = basePath(item.href) === here ? ' aria-current="page"' : "";
      if (item.children) {
        var subId = "submenu-" + idx;
        var sub = item.children.map(function (c) {
          var ca = basePath(c.href) === here ? ' class="active" aria-current="page"' : "";
          return '<li><a href="' + c.href + '"' + ca + '><span class="dot"></span>' + c.label + "</a></li>";
        }).join("");
        menu +=
          '<li class="nav-item nav-item--has-dropdown">' +
            '<a class="nav-link' + active + '" href="' + item.href + '"' + aria + '>' + item.label + "</a>" +
            '<button class="nav-caret" type="button" aria-expanded="false" aria-controls="' + subId + '" aria-label="Toggle ' + item.label + ' menu">' + ICON.caret + "</button>" +
            '<ul class="dropdown" id="' + subId + '">' + sub + "</ul>" +
          "</li>";
      } else {
        menu +=
          '<li class="nav-item">' +
            '<a class="nav-link' + active + '" href="' + item.href + '"' + aria + '>' + item.label + "</a>" +
          "</li>";
      }
    });

    return '' +
      '<div class="container nav">' +
        '<a class="brand" href="/" aria-label="Ronnie Balonon — Home">' +
          '<img class="brand__logo" src="/assets/logo-black.png" alt="Ronnie Balonon logo" />' +
          '<span class="brand__name">Ronnie Balonon</span>' +
        "</a>" +
        '<nav class="nav-primary" aria-label="Primary">' +
          '<ul class="nav-menu">' + menu + "</ul>" +
        "</nav>" +
        '<div class="nav-actions">' +
          '<a class="btn btn--primary nav-cta" href="/#contact">Contact Me</a>' +
          '<button class="hamburger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="primary-navigation"><span></span></button>' +
        "</div>" +
      "</div>";
  }

  /* ---- Build footer -------------------------------------------------- */
  function footerLinks(items) {
    return items.map(function (i) {
      return '<li><a href="' + i.href + '">' + i.label + "</a></li>";
    }).join("");
  }

  function findNav(href) {
    for (var i = 0; i < NAV.length; i++) { if (NAV[i].href === href) return NAV[i]; }
    return { children: [] };
  }

  function buildFooter() {
    var portfolioLinks = footerLinks(findNav("/portfolio/").children);
    var expertiseLinks = footerLinks(findNav("/other-expertise/").children);
    var year = new Date().getFullYear();

    return '' +
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="/"><img class="brand__logo" src="/assets/logo-white.png" alt="Ronnie Balonon logo" /><span class="brand__name">Ronnie Balonon</span></a>' +
            "<p>Dubai-based, AI-powered Graphic Designer crafting clean, professional and effective visual experiences for brands and businesses.</p>" +
            '<ul class="footer-contact">' +
              '<li><span class="ico">' + ICON.phone + '</span><a href="' + CONTACT.phoneHref + '">' + CONTACT.phone + "</a></li>" +
              '<li><span class="ico">' + ICON.mail + '</span><a href="mailto:' + CONTACT.email + '">' + CONTACT.email + "</a></li>" +
            "</ul>" +
            '<div class="socials">' +
              '<a href="#" aria-label="Instagram (placeholder)">' + ICON.instagram + "</a>" +
              '<a href="#" aria-label="Facebook (placeholder)">' + ICON.facebook + "</a>" +
              '<a href="#" aria-label="TikTok (placeholder)">' + ICON.tiktok + "</a>" +
            "</div>" +
          "</div>" +
          '<div class="footer-col">' +
            "<h4>Portfolio</h4>" +
            '<ul class="footer-links"><li><a href="/portfolio/">Overview</a></li>' + portfolioLinks + "</ul>" +
          "</div>" +
          '<div class="footer-col">' +
            "<h4>Expertise</h4>" +
            '<ul class="footer-links"><li><a href="/other-expertise/">Overview</a></li>' + expertiseLinks + "</ul>" +
          "</div>" +
          '<div class="footer-col">' +
            "<h4>More</h4>" +
            '<ul class="footer-links">' +
              '<li><a href="/about/">About Me</a></li>' +
              '<li><a href="/graphic-design-portfolio/">Graphic Design</a></li>' +
              '<li><a href="/tools/">Tools I Use</a></li>' +
              '<li><a href="/resume/">Resume</a></li>' +
            "</ul>" +
          "</div>" +
        "</div>" +
        '<div class="footer-bottom">' +
          "<span>&copy; " + year + " Ronnie Balonon — Dubai-based Graphic Designer.</span>" +
          '<span>Built with clean HTML, CSS &amp; JavaScript.</span>' +
        "</div>" +
      "</div>";
  }

  /* ---- Wire interactions -------------------------------------------- */
  function wireNav(header) {
    var body = document.body;
    var hamburger = header.querySelector(".hamburger");
    var carets = header.querySelectorAll(".nav-caret");

    function closeMenu() {
      body.classList.remove("nav-open");
      hamburger.setAttribute("aria-expanded", "false");
      hamburger.setAttribute("aria-label", "Open menu");
    }

    hamburger.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      hamburger.setAttribute("aria-expanded", String(open));
      hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    carets.forEach(function (caret) {
      caret.addEventListener("click", function (e) {
        e.preventDefault();
        var item = caret.closest(".nav-item");
        var open = item.classList.toggle("is-open");
        caret.setAttribute("aria-expanded", String(open));
        // close sibling dropdowns
        header.querySelectorAll(".nav-item.is-open").forEach(function (other) {
          if (other !== item) {
            other.classList.remove("is-open");
            var c = other.querySelector(".nav-caret");
            if (c) c.setAttribute("aria-expanded", "false");
          }
        });
      });
    });

    // Close mobile menu when a real link is followed
    header.querySelectorAll(".nav-link, .dropdown a").forEach(function (link) {
      link.addEventListener("click", function () { closeMenu(); });
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMenu();
        header.querySelectorAll(".nav-item.is-open").forEach(function (it) {
          it.classList.remove("is-open");
          var c = it.querySelector(".nav-caret");
          if (c) c.setAttribute("aria-expanded", "false");
        });
      }
    });

    // Reset state when resizing back to desktop
    var mq = window.matchMedia("(min-width: 1081px)");
    mq.addEventListener("change", function (e) { if (e.matches) closeMenu(); });
  }

  /* ---- Scroll reveal ------------------------------------------------- */
  function wireReveal() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(function (el) { obs.observe(el); });
  }

  /* ---- Back to top --------------------------------------------------- */
  function wireToTop() {
    var btn = document.createElement("button");
    btn.className = "to-top";
    btn.type = "button";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = ICON.top;
    document.body.appendChild(btn);
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    function onScroll() {
      if (window.scrollY > 500) btn.classList.add("show");
      else btn.classList.remove("show");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Inject arrows into any [data-arrow] links -------------------- */
  function injectArrows() {
    document.querySelectorAll("[data-arrow]").forEach(function (el) {
      el.insertAdjacentHTML("beforeend", ICON.arrow);
    });
  }

  /* ---- Category filter bars (portfolio & expertise galleries) ------- */
  function wireFilters() {
    document.querySelectorAll("[data-filter-group]").forEach(function (group) {
      var btns = group.querySelectorAll(".filter-btn");
      var items = group.querySelectorAll("[data-category]");
      if (!btns.length || !items.length) return;

      function apply(filter) {
        items.forEach(function (it) {
          var show = filter === "all" || it.getAttribute("data-category") === filter;
          it.classList.toggle("is-hidden", !show);
        });
      }

      btns.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var filter = btn.getAttribute("data-filter");
          btns.forEach(function (b) {
            var on = b === btn;
            b.classList.toggle("active", on);
            b.setAttribute("aria-selected", on ? "true" : "false");
          });
          apply(filter);
        });
      });
    });
  }

  /* ---- Fill shared CTA placeholders --------------------------------- */
  function fillCTAs() {
    var buttons =
      '<a class="btn btn--light" href="mailto:' + CONTACT.email + '">Email Me</a>' +
      '<a class="btn btn--whatsapp" href="' + CONTACT.whatsappHref + '" target="_blank" rel="noopener">' +
        ICON.whatsapp + "WhatsApp Me</a>";
    var contact =
      '<a href="' + CONTACT.phoneHref + '">' + ICON.phone + "Call · " + CONTACT.phone + "</a>" +
      '<a href="mailto:' + CONTACT.email + '">' + ICON.mail + CONTACT.email + "</a>";

    document.querySelectorAll("[data-cta-buttons]").forEach(function (el) { el.innerHTML = buttons; });
    document.querySelectorAll("[data-cta-contact]").forEach(function (el) { el.innerHTML = contact; });
  }

  /* ---- Floating widgets: WhatsApp + AI assistant -------------------- */
  function buildWidgets() {
    var dock = document.createElement("div");
    dock.className = "fab-dock";
    dock.innerHTML =
      '<button class="fab fab--ai fab__pulse" type="button" id="ai-launch" aria-label="Open AI assistant" aria-expanded="false" aria-controls="ai-panel">' +
        ICON.ai + '<span class="fab__tip">Ask AI</span>' +
      "</button>" +
      '<a class="fab fab--wa" href="' + CONTACT.whatsappHref + '" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">' +
        ICON.whatsapp + '<span class="fab__tip">WhatsApp</span>' +
      "</a>";
    document.body.appendChild(dock);

    var panel = document.createElement("section");
    panel.className = "ai-panel";
    panel.id = "ai-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "AI assistant");
    panel.innerHTML =
      '<div class="ai-head">' +
        '<span class="avatar">' + ICON.ai + "</span>" +
        '<div><h3>Ronnie’s AI Assistant</h3><div class="status">Online · typically quick</div></div>' +
        '<button class="ai-close" type="button" id="ai-close" aria-label="Close assistant">' + ICON.close + "</button>" +
      "</div>" +
      '<div class="ai-body" id="ai-body" aria-live="polite"></div>' +
      '<div class="ai-chips" id="ai-chips"></div>' +
      '<form class="ai-input" id="ai-form">' +
        '<label class="visually-hidden" for="ai-text">Type your message</label>' +
        '<input id="ai-text" type="text" autocomplete="off" placeholder="Ask about services, work, contact…" />' +
        '<button class="ai-send" type="submit" aria-label="Send message">' + ICON.send + "</button>" +
      "</form>" +
      '<p class="ai-note">Automated assistant · for a personal reply, use WhatsApp or email.</p>';
    document.body.appendChild(panel);

    wireAI(dock, panel);
  }

  /* ---- AI assistant: local, keyword-based knowledge ----------------- */
  function aiReply(text) {
    var t = (text || "").toLowerCase();
    var link = function (href, label) { return '<a href="' + href + '">' + label + "</a>"; };
    var has = function () {
      for (var i = 0; i < arguments.length; i++) { if (t.indexOf(arguments[i]) !== -1) return true; }
      return false;
    };

    if (has("hi", "hello", "hey", "salam", "marhaba")) {
      return "Hi there! 👋 I'm Ronnie's assistant. I can tell you about his <strong>services</strong>, show you the <strong>portfolio</strong>, or share <strong>contact</strong> details. What would you like to know?";
    }
    if (has("service", "what do you do", "offer", "help with")) {
      return "Ronnie offers a full creative toolkit: " +
        link("/graphic-design-portfolio/", "Graphic Design") + ", " +
        link("/logo-branding/", "Logo Branding") + ", " +
        link("/web-design/", "Web Design") + ", " +
        link("/photography/", "Photography") + ", " +
        link("/video-editing/", "Video Editing") + " and " +
        link("/social-media/", "Social Media") + ". Want details on any one?";
    }
    if (has("logo", "brand", "identity")) {
      return "For branding, see " + link("/logo-branding/", "Logo Branding") +
        " (full identity systems) and " + link("/logo-identity/", "Logo Identity") +
        " (logo concepts, marks &amp; variations).";
    }
    if (has("web", "website", "landing", "ui")) {
      return "Ronnie designs clean, responsive sites — landing pages, portfolios and business websites. See " +
        link("/web-design/", "Web Design") + ".";
    }
    if (has("photo")) { return "Product, lifestyle and event photography — take a look at " + link("/photography/", "Photography") + "."; }
    if (has("video", "reel", "edit", "motion")) { return "Reels, promos and brand videos with clean cuts and colour. See " + link("/video-editing/", "Video Editing") + "."; }
    if (has("ai", "artificial")) { return "Ronnie uses AI to speed up ideation and exploration — but every final design decision stays human-led. More on " + link("/artificial-intelligence/", "Artificial Intelligence") + "."; }
    if (has("social", "instagram", "post", "campaign")) { return "Post designs, campaign visuals, reels covers and story templates — see " + link("/social-media/", "Social Media") + "."; }
    if (has("graphic", "poster", "print", "flyer", "ad")) { return "Posters, digital ads, marketing creatives and print layouts live on the " + link("/graphic/", "Graphic") + " page."; }
    if (has("mockup", "packaging", "preview")) { return "Realistic product and packaging mockups are on the " + link("/mockups/", "Mockups") + " page."; }
    if (has("portfolio", "work", "project", "sample", "example")) {
      return "You can explore the full " + link("/graphic-design-portfolio/", "Graphic Design Portfolio") +
        " and " + link("/other-expertise/", "Other Expertise") + " for everything else.";
    }
    if (has("price", "cost", "rate", "budget", "quote", "fee", "how much")) {
      return "Pricing depends on the scope and timeline of your project. Share a few details and Ronnie will send a tailored quote — reach him on " +
        '<a href="' + CONTACT.whatsappHref + '" target="_blank" rel="noopener">WhatsApp</a> or ' +
        '<a href="mailto:' + CONTACT.email + '">email</a>.';
    }
    if (has("contact", "reach", "email", "phone", "call", "whatsapp", "number")) {
      return "Here's how to reach Ronnie:<br>📞 <a href=\"" + CONTACT.phoneHref + "\">" + CONTACT.phone + "</a>" +
        "<br>✉️ <a href=\"mailto:" + CONTACT.email + "\">" + CONTACT.email + "</a>" +
        "<br>💬 <a href=\"" + CONTACT.whatsappHref + "\" target=\"_blank\" rel=\"noopener\">Chat on WhatsApp</a>";
    }
    if (has("hire", "available", "freelance", "work with", "collab", "start")) {
      return "Yes — Ronnie is available for freelance work and collaborations in Dubai and beyond. The fastest way to start is " +
        '<a href="' + CONTACT.whatsappHref + '" target="_blank" rel="noopener">WhatsApp</a>.';
    }
    if (has("where", "location", "based", "dubai")) { return "Ronnie is a graphic designer based in <strong>Dubai, UAE</strong>, working with clients locally and internationally."; }
    if (has("thank", "thanks", "shukran")) { return "You're welcome! 🙏 Feel free to reach out anytime on WhatsApp or email."; }

    return "Good question! I can help with <strong>services</strong>, <strong>portfolio</strong>, <strong>pricing &amp; availability</strong> or <strong>contact</strong> details. You can also message Ronnie directly on " +
      '<a href="' + CONTACT.whatsappHref + '" target="_blank" rel="noopener">WhatsApp</a>.';
  }

  function wireAI(dock, panel) {
    var launch = dock.querySelector("#ai-launch");
    var closeBtn = panel.querySelector("#ai-close");
    var body = panel.querySelector("#ai-body");
    var chips = panel.querySelector("#ai-chips");
    var form = panel.querySelector("#ai-form");
    var input = panel.querySelector("#ai-text");
    var greeted = false;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function scrollDown() { body.scrollTop = body.scrollHeight; }

    function addMsg(html, who) {
      var el = document.createElement("div");
      el.className = "ai-msg " + who;
      el.innerHTML = html;
      body.appendChild(el);
      scrollDown();
    }

    function botRespond(text) {
      var html = aiReply(text);
      if (reduce) { addMsg(html, "bot"); return; }
      var typing = document.createElement("div");
      typing.className = "ai-typing";
      typing.innerHTML = "<span></span><span></span><span></span>";
      body.appendChild(typing);
      scrollDown();
      setTimeout(function () {
        typing.remove();
        addMsg(html, "bot");
      }, 650);
    }

    var QUICK = ["Services", "Portfolio", "Pricing & availability", "Contact"];
    function renderChips() {
      chips.innerHTML = "";
      QUICK.forEach(function (q) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "ai-chip";
        b.textContent = q;
        b.addEventListener("click", function () { send(q); });
        chips.appendChild(b);
      });
    }

    function send(text) {
      text = (text || "").trim();
      if (!text) return;
      addMsg(text.replace(/</g, "&lt;"), "user");
      input.value = "";
      botRespond(text);
    }

    function openPanel() {
      panel.classList.add("open");
      launch.setAttribute("aria-expanded", "true");
      launch.classList.remove("fab__pulse");
      if (!greeted) {
        greeted = true;
        addMsg("Hi! 👋 I'm Ronnie's AI assistant. Ask me about his services, portfolio, pricing or how to get in touch.", "bot");
        renderChips();
      }
      setTimeout(function () { input.focus(); }, 200);
    }
    function closePanel() {
      panel.classList.remove("open");
      launch.setAttribute("aria-expanded", "false");
      launch.focus();
    }

    launch.addEventListener("click", function () {
      if (panel.classList.contains("open")) closePanel(); else openPanel();
    });
    closeBtn.addEventListener("click", closePanel);
    form.addEventListener("submit", function (e) { e.preventDefault(); send(input.value); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("open")) closePanel();
    });
  }

  /* ---- Navbar shrink-on-scroll -------------------------------------- */
  function wireHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;
    function onScroll() {
      header.classList.toggle("scrolled", window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- Inject favicon on every page --------------------------------- */
  function setFavicon() {
    if (document.querySelector('link[rel="icon"]')) return;
    var icon = document.createElement("link");
    icon.rel = "icon";
    icon.type = "image/png";
    icon.href = "/assets/favicon.png?v=2";
    document.head.appendChild(icon);
    var touch = document.createElement("link");
    touch.rel = "apple-touch-icon";
    touch.href = "/assets/favicon.png?v=2";
    document.head.appendChild(touch);
  }

  /* ---- Init ---------------------------------------------------------- */
  function init() {
    setFavicon();
    var header = document.getElementById("site-header");
    var footer = document.getElementById("site-footer");
    if (header) {
      header.className = "site-header";
      header.innerHTML = buildHeader();
      var navEl = header.querySelector(".nav-menu");
      if (navEl) navEl.id = "primary-navigation";
      wireNav(header);
    }
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML = buildFooter();
    }
    injectArrows();
    fillCTAs();
    wireFilters();
    buildWidgets();
    wireReveal();
    wireToTop();
    wireHeaderScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
