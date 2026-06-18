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
    { label: "Home", href: "/" },
    { label: "About Me", href: "/about/" },
    { label: "Graphic Design", href: "/graphic-design-portfolio/" },
    {
      label: "Other Expertise",
      href: "/other-expertise/",
      noDropdown: true,
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
        { label: "Graphic Design", href: "/portfolio/graphic-design/", icon: "layers" },
        { label: "Social Media", href: "/portfolio/social-media/", icon: "share" },
        { label: "Web Design", href: "/portfolio/web-design/", icon: "monitor" },
        { label: "Artificial Intelligence", href: "/portfolio/artificial-intelligence/", icon: "ai" },
        { label: "Photography", href: "/portfolio/photography/", icon: "camera" },
        { label: "Video Editing", href: "/portfolio/video-editing/", icon: "film" }
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
    send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/><path d="M9 21v-6h6v6"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    monitor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>',
    film: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>'
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
      if (item.children && !item.noDropdown) {
        var subId = "submenu-" + idx;
        var sub = item.children.map(function (c) {
          var ca = basePath(c.href) === here ? ' class="active" aria-current="page"' : "";
          var lead = c.icon
            ? '<span class="d-ico">' + (ICON[c.icon] || "") + "</span>"
            : '<span class="dot"></span>';
          return '<li><a href="' + c.href + '"' + ca + ">" + lead + c.label + "</a></li>";
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
          '<img class="brand__logo" src="/assets/logo-black.png?v=2" alt="Ronnie Balonon" />' +
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
            '<a class="brand" href="/" aria-label="Ronnie Balonon — Home"><img class="brand__logo" src="/assets/logo-black.png?v=2" alt="Ronnie Balonon" /></a>' +
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
          // No "All" button: clicking the active category again clears back to showing everything
          if (btn.classList.contains("active") && filter !== "all") {
            btns.forEach(function (b) { b.classList.remove("active"); b.setAttribute("aria-selected", "false"); });
            var allBtn = group.querySelector('[data-filter="all"]');
            if (allBtn) { allBtn.classList.add("active"); allBtn.setAttribute("aria-selected", "true"); }
            apply("all");
            return;
          }
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

  /* ---- AI assistant: local knowledge base + typo-tolerant matching ---
     Knows the whole site (who Ronnie is, services, experience, clients,
     tools, pricing, contact…) and tolerates misspellings via fuzzy
     token matching, so "phtography" / "servies" / "portfolyo" still work. */
  var AI_LINK = function (href, label, ext) {
    return '<a href="' + href + '"' + (ext ? ' target="_blank" rel="noopener"' : "") + ">" + label + "</a>";
  };
  var WA = function (label) { return AI_LINK(CONTACT.whatsappHref, label || "WhatsApp", true); };
  var EMAIL = function (label) { return '<a href="mailto:' + CONTACT.email + '">' + (label || CONTACT.email) + "</a>"; };

  /* Levenshtein edit distance — powers spelling tolerance */
  function aiLev(a, b) {
    var m = a.length, n = b.length;
    if (!m) return n; if (!n) return m;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        var cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      for (j = 0; j <= n; j++) prev[j] = cur[j];
    }
    return prev[n];
  }

  /* Common function words: allowed to match a keyword only EXACTLY, never
     fuzzily — stops "there"~"where", "were"~"where", "yours"~"yourself" etc. */
  var AI_STOP = { there:1, here:1, were:1, your:1, yours:1, you:1, are:1, the:1,
    this:1, that:1, these:1, those:1, with:1, have:1, has:1, had:1, will:1,
    would:1, could:1, should:1, and:1, but:1, not:1, for:1, from:1, into:1,
    want:1, need:1, like:1, was:1, them:1, they:1, their:1, then:1, than:1 };

  /* One user token ~ one keyword? exact, sensible substring, or close spelling.
     The shorter side must be >= 5 chars for a substring hit, so tiny tokens
     like "hi" don't match inside "graphic" and "your" inside "yourself". */
  function aiTokSim(a, b) {
    if (a === b) return true;
    if (AI_STOP[a]) return false;                  // common words: exact-only
    var la = a.length, lb = b.length;
    if (Math.min(la, lb) >= 5 && (a.indexOf(b) !== -1 || b.indexOf(a) !== -1)) return true;
    var thr = lb <= 3 ? 0 : (lb <= 6 ? 1 : 2);     // short words demand an exact hit
    if (!thr || Math.abs(la - lb) > thr) return false;
    return aiLev(a, b) <= thr;
  }

  /* Score an intent: multi-word phrase hits weigh more than single keywords.
     Phrases are matched on word boundaries (space-padded) so "who are you"
     doesn't fire on "who are your clients". */
  function aiScore(intent, norm, toks) {
    var s = 0, i, j;
    if (intent.phrases) {
      var padded = " " + norm + " ";
      for (i = 0; i < intent.phrases.length; i++) {
        if (padded.indexOf(" " + intent.phrases[i] + " ") !== -1) s += 3;
      }
    }
    if (intent.keys) for (i = 0; i < intent.keys.length; i++) {
      for (j = 0; j < toks.length; j++) { if (aiTokSim(toks[j], intent.keys[i])) { s += 1; break; } }
    }
    return s;
  }

  var AI_FALLBACK =
    "I'm not totally sure I caught that — try rephrasing, or pick a topic: " +
    "<strong>who Ronnie is</strong>, <strong>services</strong>, <strong>portfolio</strong>, " +
    "<strong>experience</strong>, <strong>clients</strong>, <strong>tools</strong>, " +
    "<strong>pricing &amp; availability</strong> or <strong>contact</strong>. " +
    "You can also message Ronnie directly on " + WA() + ".";

  /* Ordered knowledge base. keys = fuzzy single words; phrases = substrings. */
  var AI_KB = [
    { keys: ["services", "service", "offer", "offerings", "expertise", "capabilities", "skills", "skill"],
      phrases: ["what do you do", "what can you do", "what do you offer", "what services", "services you offer", "what you do", "can you do"],
      a: "Ronnie offers a full creative toolkit: " + AI_LINK("/graphic-design-portfolio/", "Graphic Design") + ", " +
         AI_LINK("/logo-branding/", "Logo Branding") + ", " + AI_LINK("/web-design/", "Web Design") + ", " +
         AI_LINK("/photography/", "Photography") + ", " + AI_LINK("/video-editing/", "Video Editing") + " and " +
         AI_LINK("/social-media/", "Social Media") + ". Want details on any one?" },

    { keys: ["logo", "logos", "brand", "branding", "identity", "guidelines", "guideline", "wordmark", "monogram", "rebrand", "logotype"],
      phrases: ["brand identity", "logo design", "visual identity"],
      a: "For branding: " + AI_LINK("/logo-branding/", "Logo Branding") + " covers full identity systems (logos, palettes &amp; guidelines), and " +
         AI_LINK("/logo-identity/", "Logo Identity") + " covers logo concepts, marks, wordmarks &amp; monograms." },

    { keys: ["web", "website", "websites", "landing", "ui", "ux", "site", "sites", "webpage", "webdesign"],
      phrases: ["web design", "landing page", "build a website", "make a website", "build a site"],
      a: "Ronnie designs clean, responsive websites — landing pages, portfolios and business sites, with UI direction. See " +
         AI_LINK("/web-design/", "Web Design") + ", or real builds in the " + AI_LINK("/portfolio/web-design/", "web portfolio") + "." },

    { keys: ["photo", "photos", "photography", "photographer", "photoshoot", "picture", "pictures", "camera", "portrait", "portraits"],
      phrases: ["product shots", "photo shoot"],
      a: "Product, food, beverage, coffee and portrait photography — take a look at " + AI_LINK("/photography/", "Photography") + "." },

    { keys: ["video", "videos", "reel", "reels", "editing", "edit", "edits", "motion", "promo", "clip", "clips", "footage"],
      phrases: ["video editing", "video edit"],
      a: "Reels, promos and short-form edits with clean cuts and colour — see " + AI_LINK("/video-editing/", "Video Editing") + "." },

    { keys: ["social", "instagram", "insta", "facebook", "tiktok", "post", "posts", "feed", "stories", "story", "campaign", "campaigns", "content"],
      phrases: ["social media"],
      a: "Post designs, campaign visuals, reels and story templates — see " + AI_LINK("/social-media/", "Social Media") +
         ". For Ronnie's latest handles, message him on " + WA() + "." },

    { keys: ["graphic", "graphics", "poster", "posters", "print", "flyer", "flyers", "leaflet", "leaflets", "banner", "banners", "menu", "menus", "signage", "brochure", "brochures", "ad", "ads", "advertising"],
      phrases: ["print design", "business card", "business cards", "roll up"],
      a: "Posters, digital ads, flyers, leaflets, roll-up banners, restaurant menus, business cards and product packaging — explore the " +
         AI_LINK("/graphic/", "Graphic") + " page, plus " + AI_LINK("/mockups/", "Mockups") + " for realistic previews." },

    { keys: ["mockup", "mockups", "mock", "packaging", "preview", "previews"],
      a: "Realistic product &amp; packaging mockups are on the " + AI_LINK("/mockups/", "Mockups") + " page." },

    { keys: ["ai", "artificial", "midjourney", "chatgpt", "claude", "kling", "dreamina", "freepik", "automation", "gpt"],
      phrases: ["artificial intelligence", "ai workflow", "ai tools", "use ai"],
      a: "Ronnie uses AI tools — Claude, ChatGPT, Midjourney, Freepik, Kling and Dreamina — to speed up ideation and exploration, while every final design decision stays human-led. More on " +
         AI_LINK("/artificial-intelligence/", "Artificial Intelligence") + "." },

    { keys: ["tools", "tool", "software", "apps", "app", "programs", "program", "adobe", "illustrator", "photoshop", "indesign", "lightroom", "premiere", "figma", "vscode", "xd"],
      phrases: ["what tools", "tools do you use", "software do you use", "what software", "apps do you use"],
      a: "Ronnie's toolkit: <strong>Adobe Illustrator, Photoshop, InDesign, Lightroom, Premiere Pro, XD</strong>, <strong>Figma</strong> and <strong>VS Code</strong> — plus AI tools like <strong>Claude, ChatGPT, Midjourney, Freepik, Kling</strong> and <strong>Dreamina</strong>. See the " +
         AI_LINK("/tools/", "Tools I Use") + " page." },

    { keys: ["portfolio", "work", "works", "project", "projects", "sample", "samples", "example", "examples", "showcase", "gallery"],
      phrases: ["your work", "see your work", "view work", "past work", "previous work"],
      a: "Explore real work across every discipline in the " + AI_LINK("/portfolio/", "Portfolio") + " — " +
         AI_LINK("/portfolio/graphic-design/", "graphic design") + ", " + AI_LINK("/portfolio/web-design/", "web") + ", " +
         AI_LINK("/portfolio/social-media/", "social media") + ", " + AI_LINK("/portfolio/photography/", "photography") + ", " +
         AI_LINK("/portfolio/video-editing/", "video") + " and " + AI_LINK("/portfolio/artificial-intelligence/", "AI") + "." },

    { keys: ["client", "clients", "companies", "company", "brands", "customers"],
      phrases: ["worked with", "work for", "who have you worked", "clients you", "worked for"],
      a: "Ronnie has worked with brands including <strong>Alcon</strong> (advertising), <strong>Power Media</strong> (media &amp; advertising), <strong>Click</strong> (advertising agency), <strong>33 Degree</strong> (speciality coffee), <strong>Bloomfields</strong> (real estate) and <strong>International Logistics Services</strong>. See the work in the " +
         AI_LINK("/portfolio/", "Portfolio") + "." },

    { keys: ["experience", "experienced", "years", "year", "senior", "junior", "skilled"],
      phrases: ["how long", "years of experience", "your experience", "how experienced", "work history"],
      a: "Ronnie has <strong>1+ year</strong> of professional experience as a freelance graphic designer in Dubai — <strong>50+ projects</strong> for <strong>10+ happy clients</strong>. His work spans full brand identities (logos, colour systems, typography, guidelines), print &amp; packaging, plus web/UI, photography, video and social media. Full details on his " +
         AI_LINK("/resume/", "Resume") + "." },

    { keys: ["process", "workflow", "steps", "step", "approach", "stages", "method"],
      phrases: ["how do you work", "your process", "how does it work", "what is the process", "how you work", "work process"],
      a: "Ronnie works in four clear steps: <strong>1) Discover</strong> — goals, audience &amp; brand; <strong>2) Design</strong> — clean, intentional visuals; <strong>3) Refine</strong> — review &amp; polish through structured feedback; <strong>4) Deliver</strong> — organised, production-ready files. See the full process " +
         AI_LINK("/#process", "here") + "." },

    { keys: ["price", "pricing", "cost", "costs", "rate", "rates", "budget", "quote", "fee", "fees", "charge", "charges", "expensive", "cheap", "afford", "pay"],
      phrases: ["how much", "price list", "your rates", "cost to"],
      a: "Pricing depends on your project's scope and timeline. Share a few details and Ronnie will send a tailored quote — reach him on " +
         WA() + " or " + EMAIL("email") + "." },

    { keys: ["hire", "available", "availability", "freelance", "collab", "collaborate", "collaboration", "start", "book", "booking", "busy", "commission"],
      phrases: ["work with", "are you available", "can you help", "take on", "open for", "work together", "hire you", "looking for a designer", "need a designer", "available for"],
      a: "Yes — Ronnie is available for freelance work, collaborations and design projects in Dubai and beyond. The fastest way to start is " +
         WA() + "." },

    { keys: ["contact", "reach", "email", "mail", "phone", "call", "whatsapp", "whatsap", "number", "message", "dm", "text", "gmail"],
      phrases: ["get in touch", "reach you", "contact details", "phone number", "email address", "contact ronnie", "reach ronnie", "contact info"],
      a: "Here's how to reach Ronnie:<br>📞 <a href=\"" + CONTACT.phoneHref + "\">" + CONTACT.phone + "</a>" +
         "<br>✉️ " + EMAIL() + "<br>💬 " + WA("Chat on WhatsApp") },

    { keys: ["where", "location", "located", "based", "dubai", "uae", "city", "country", "emirates", "region"],
      phrases: ["where are you", "based in", "where is ronnie", "where do you"],
      a: "Ronnie is a graphic designer based in <strong>Dubai, UAE</strong>, working with clients locally and internationally." },

    { keys: ["language", "languages", "speak", "speaks", "english", "filipino", "tagalog", "bilingual"],
      phrases: ["what language", "languages do you"],
      a: "Ronnie speaks <strong>English</strong> and <strong>Filipino</strong>." },

    { keys: ["education", "study", "studied", "degree", "school", "college", "university", "qualification", "graduate", "diploma"],
      phrases: ["did you study", "your education", "where did you study"],
      a: "Ronnie holds an <strong>Associate in Computer Technology (ACT)</strong> from <strong>STI College</strong>." },

    { keys: ["resume", "cv", "curriculum"],
      phrases: ["download cv", "download resume", "your cv", "your resume", "see your resume"],
      a: "You can view Ronnie's one-page " + AI_LINK("/resume/", "Resume") + ", or download the " +
         AI_LINK("/assets/Ronnie-Balonon-Resume.pdf", "Resume PDF") + " / " + AI_LINK("/assets/Ronnie-Balonon-CV.pdf", "full CV") + "." },

    { keys: ["ronnie", "balonon", "who", "yourself", "about", "bio", "background", "profile", "designer"],
      phrases: ["who is", "who s", "who are you", "about you", "about ronnie", "about him", "tell me about", "your background", "your story", "who is ronnie"],
      a: "Ronnie Balonon Jr. is a Dubai-based, <strong>AI-powered graphic designer</strong>. He blends clean, professional design — branding, layouts and visual storytelling — with AI-driven workflows that move fast while keeping every final decision human-led. With <strong>1+ year</strong> of professional experience, he's delivered <strong>50+ projects</strong> for <strong>10+ happy clients</strong>. More on the " +
         AI_LINK("/about/", "About") + " page or his " + AI_LINK("/resume/", "Resume") + "." },

    { keys: ["hi", "hello", "hey", "salam", "marhaba", "yo", "sup", "hola", "greetings", "hiya"],
      phrases: ["good morning", "good evening", "good afternoon"],
      a: "Hi there! 👋 I'm Ronnie's assistant. Ask me about <strong>who he is</strong>, his <strong>services</strong>, <strong>portfolio</strong>, <strong>experience</strong>, <strong>tools</strong>, <strong>pricing &amp; availability</strong> or <strong>contact</strong> details. What would you like to know?" },

    { keys: ["thanks", "thank", "shukran", "appreciate", "thx", "ty"],
      a: "You're welcome! 🙏 Feel free to reach out anytime on " + WA() + " or " + EMAIL("email") + "." }
  ];

  function aiReply(text) {
    var norm = (text || "").toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
    if (!norm) return "Ask me anything about Ronnie — his work, services, experience, tools or how to get in touch. 🙂";
    var toks = norm.split(" ");
    var best = null, bestScore = 0;
    for (var i = 0; i < AI_KB.length; i++) {
      var sc = aiScore(AI_KB[i], norm, toks);
      if (sc > bestScore) { bestScore = sc; best = AI_KB[i]; }
    }
    return (best && bestScore > 0) ? best.a : AI_FALLBACK;
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

    var QUICK = ["About Ronnie", "Services", "Portfolio", "Pricing", "Contact"];
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
        addMsg("Hi! 👋 I'm Ronnie's AI assistant. Ask me about <strong>who he is</strong>, his <strong>services</strong>, <strong>portfolio</strong>, <strong>experience</strong>, <strong>tools</strong>, <strong>pricing</strong> or how to <strong>get in touch</strong> — typos are fine. 🙂", "bot");
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
    icon.href = "/assets/favicon.png?v=3";
    document.head.appendChild(icon);
    var touch = document.createElement("link");
    touch.rel = "apple-touch-icon";
    touch.href = "/assets/favicon.png?v=3";
    document.head.appendChild(touch);
  }

  /* ---- Lightbox preview for gallery images -------------------------- */
  function wireLightbox() {
    var imgs = [].slice.call(
      document.querySelectorAll("[data-filter-group] img.shot, .photo-grid img.shot, main .grid img.shot, .cb-panel img.shot, .work-grid img.shot")
    ).filter(function (img) {
      if (img.closest(".feature__media")) return false;        // feature visuals, not gallery items
      var container = img.closest(".card, .work-tile");
      if (container && container.querySelector("a.stretched")) return false; // skip items that link out (PDF/website)
      return true;
    });
    if (!imgs.length) return;

    var lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("aria-hidden", "true");
    lb.innerHTML =
      '<button class="lightbox__close" type="button" aria-label="Close preview">' + ICON.close + "</button>" +
      '<button class="lightbox__nav lightbox__prev" type="button" aria-label="Previous image">' + ICON.caret + "</button>" +
      '<img class="lightbox__img" alt="" />' +
      '<button class="lightbox__nav lightbox__next" type="button" aria-label="Next image">' + ICON.caret + "</button>";
    document.body.appendChild(lb);
    var lbImg = lb.querySelector(".lightbox__img");
    var idx = 0;

    function show(i) {
      idx = (i + imgs.length) % imgs.length;
      lbImg.src = imgs[idx].currentSrc || imgs[idx].src;
      lbImg.alt = imgs[idx].alt || "";
    }
    function open(i) {
      show(i);
      lb.classList.add("is-open");
      lb.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lb.classList.remove("is-open");
      lb.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lbImg.removeAttribute("src");
    }

    imgs.forEach(function (img, i) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () { open(i); });
    });
    lb.querySelector(".lightbox__close").addEventListener("click", close);
    lb.querySelector(".lightbox__prev").addEventListener("click", function (e) { e.stopPropagation(); show(idx - 1); });
    lb.querySelector(".lightbox__next").addEventListener("click", function (e) { e.stopPropagation(); show(idx + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(idx - 1);
      else if (e.key === "ArrowRight") show(idx + 1);
    });
  }

  /* ---- Expertise carousel (3-up, infinite prev/next) ---------------- */
  function wireExpCarousel() {
    var roots = document.querySelectorAll("[data-exp-carousel]");
    Array.prototype.forEach.call(roots, function (root) {
      var track = root.querySelector("[data-exp-track]");
      var prev = root.querySelector("[data-exp-prev]");
      var next = root.querySelector("[data-exp-next]");
      if (!track || !prev || !next) return;

      var originals = Array.prototype.slice.call(track.children);
      var count = originals.length;
      if (count < 2) { prev.style.display = next.style.display = "none"; return; }

      // Clone the full set once so wrapping is seamless.
      originals.forEach(function (node) {
        var clone = node.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        Array.prototype.forEach.call(clone.querySelectorAll("a"), function (a) { a.setAttribute("tabindex", "-1"); });
        track.appendChild(clone);
      });

      var index = 0;
      var animating = false;

      function step() {
        var first = track.children[0];
        var style = window.getComputedStyle(track);
        var gap = parseFloat(style.columnGap || style.gap || "0") || 0;
        return first.getBoundingClientRect().width + gap;
      }
      function place(animate) {
        track.style.transition = animate ? "transform .5s var(--ease-out, ease)" : "none";
        track.style.transform = "translateX(" + (-index * step()) + "px)";
      }
      function go(dir) {
        if (animating) return;
        if (dir < 0 && index === 0) {        // wrap left: jump to mirror, then slide
          index = count;
          place(false);
          // force reflow so the jump isn't animated
          void track.offsetWidth;
        }
        animating = true;
        index += dir;
        place(true);
      }
      track.addEventListener("transitionend", function (e) {
        if (e.propertyName !== "transform") return;
        animating = false;
        if (index >= count) { index -= count; place(false); }   // wrap right
      });

      next.addEventListener("click", function () { go(1); });
      prev.addEventListener("click", function () { go(-1); });

      var rt;
      window.addEventListener("resize", function () {
        clearTimeout(rt);
        rt = setTimeout(function () { place(false); }, 120);
      });
      place(false);
    });
  }

  /* ---- Button label slide-swap -------------------------------------- */
  /* Wrap each button's visible text so it can slide up on hover while a
     duplicate (the ::after, via data-label) rises into place. SVG icons
     are left untouched. Runs after header/footer/CTAs are injected.     */
  function enhanceButtons() {
    document.querySelectorAll(".btn").forEach(function (btn) {
      if (btn.dataset.tEnhanced) return;
      btn.dataset.tEnhanced = "1";
      Array.prototype.slice.call(btn.childNodes).forEach(function (node) {
        if (node.nodeType !== 3) return;            // text nodes only
        var label = node.textContent.replace(/\s+/g, " ").trim();
        if (!label) return;
        var outer = document.createElement("span");
        outer.className = "btn__t";
        var inner = document.createElement("span");
        inner.className = "btn__t-in";
        inner.textContent = label;
        inner.setAttribute("data-label", label);
        outer.appendChild(inner);
        btn.replaceChild(outer, node);
      });
    });
  }

  /* ---- Scroll progress bar ------------------------------------------ */
  function wireScrollProgress() {
    var bar = document.createElement("div");
    bar.className = "scroll-progress";
    bar.setAttribute("aria-hidden", "true");
    document.body.appendChild(bar);
    var ticking = false;
    function update() {
      var doc = document.documentElement;
      var max = doc.scrollHeight - doc.clientHeight;
      var p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      bar.style.transform = "scaleX(" + p + ")";
      ticking = false;
    }
    function onScroll() {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
  }

  /* ---- Cursor-follow card spotlight --------------------------------- */
  function wireCardSpotlight() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;   // skip touch
    document.querySelectorAll(".card").forEach(function (card) {
      var raf = 0, px = 0, py = 0;
      card.addEventListener("pointermove", function (e) {
        px = e.clientX; py = e.clientY;
        if (raf) return;                              // coalesce to one update per frame
        raf = window.requestAnimationFrame(function () {
          raf = 0;
          var r = card.getBoundingClientRect();        // read fresh each frame (stays correct while scrolling)
          if (!r.width || !r.height) return;
          card.style.setProperty("--mx", ((px - r.left) / r.width * 100) + "%");
          card.style.setProperty("--my", ((py - r.top) / r.height * 100) + "%");
        });
      });
    });
  }

  /* ---- Count-up for stat numbers ------------------------------------ */
  function wireCountUp() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    var nums = document.querySelectorAll(".stat .num, .stat-card .num, .hero__meta .num");
    if (!nums.length || !("IntersectionObserver" in window)) return;

    function run(el) {
      var raw = el.textContent.trim();
      var m = raw.match(/^(\D*?)(\d[\d,]*(?:\.\d+)?)(.*)$/);
      if (!m) return;
      var prefix = m[1], suffix = m[3];
      var hadComma = m[2].indexOf(",") !== -1;
      var decimals = (m[2].split(".")[1] || "").length;
      var target = parseFloat(m[2].replace(/,/g, ""));
      if (isNaN(target)) return;

      var dur = 1100, start = performance.now();
      el.classList.add("is-counting");
      function fmt(v) {
        var n = decimals ? v.toFixed(decimals)
              : (hadComma ? Math.round(v).toLocaleString() : String(Math.round(v)));
        return prefix + n + suffix;
      }
      function tick(now) {
        var t = Math.min(1, (now - start) / dur);
        var eased = 1 - Math.pow(1 - t, 3);          // easeOutCubic
        el.textContent = fmt(target * eased);
        if (t < 1) window.requestAnimationFrame(tick);
        else { el.textContent = fmt(target); el.classList.remove("is-counting"); }
      }
      window.requestAnimationFrame(tick);
    }

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { run(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { obs.observe(el); });
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
    enhanceButtons();        // after header/footer/CTAs so every .btn is wrapped
    wireFilters();
    wireLightbox();
    buildWidgets();
    wireReveal();
    wireToTop();
    wireHeaderScroll();
    wireExpCarousel();
    wireScrollProgress();
    wireCardSpotlight();
    wireCountUp();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
