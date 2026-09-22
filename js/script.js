(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme (système / clair / sombre) ---------- */
  var THEME_KEY = "theme-preference";
  var themeButtons = document.querySelectorAll("[data-theme-choice]");
  var systemDarkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function getStoredTheme() {
    try {
      var value = localStorage.getItem(THEME_KEY);
      return value === "light" || value === "dark" ? value : "system";
    } catch (e) {
      return "system";
    }
  }

  function applyTheme(choice) {
    if (choice === "light" || choice === "dark") {
      document.documentElement.setAttribute("data-theme", choice);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    themeButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.getAttribute("data-theme-choice") === choice));
    });
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      var isDark = choice === "dark" || (choice === "system" && systemDarkQuery && systemDarkQuery.matches);
      meta.setAttribute("content", isDark ? "#14120e" : "#faf8f4");
    }
  }

  function setTheme(choice) {
    try {
      if (choice === "system") {
        localStorage.removeItem(THEME_KEY);
      } else {
        localStorage.setItem(THEME_KEY, choice);
      }
    } catch (e) {}
    applyTheme(choice);
  }

  applyTheme(getStoredTheme());

  themeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setTheme(btn.getAttribute("data-theme-choice"));
    });
  });

  if (systemDarkQuery) {
    systemDarkQuery.addEventListener("change", function () {
      if (getStoredTheme() === "system") applyTheme("system");
    });
  }

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.setAttribute("aria-label", isOpen ? "Fermer le menu de navigation" : "Ouvrir le menu de navigation");
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Ouvrir le menu de navigation");
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && primaryNav.classList.contains("is-open")) {
        primaryNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.focus();
      }
    });
  }

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("scrollProgressBar");
  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    if (progressBar) progressBar.style.width = (ratio * 100).toFixed(1) + "%";
  }
  if (progressBar) {
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();
  }

  /* ---------- Scrollspy (nav active state) ---------- */
  var navLinks = document.querySelectorAll("[data-nav-link]");
  var navLinkByHash = {};
  navLinks.forEach(function (link) {
    navLinkByHash[link.getAttribute("href")] = link;
  });
  var spySections = document.querySelectorAll("main section[id]");

  if ("IntersectionObserver" in window && spySections.length) {
    var spyObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var link = navLinkByHash["#" + entry.target.id];
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.removeAttribute("aria-current"); });
            link.setAttribute("aria-current", "true");
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    spySections.forEach(function (section) { spyObserver.observe(section); });
  }

  /* ---------- Reveal on scroll (progressive enhancement) ---------- */
  var revealTargets = document.querySelectorAll(".section, .hero, .reveal-item");

  if ("IntersectionObserver" in window && revealTargets.length && !prefersReducedMotion) {
    var groupCounters = new WeakMap();
    revealTargets.forEach(function (target) {
      var parent = target.parentElement;
      var index = groupCounters.has(parent) ? groupCounters.get(parent) : 0;
      groupCounters.set(parent, index + 1);
      target.style.setProperty("--stagger", String(Math.min(index, 6)));
      target.classList.add("reveal-pending");
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealTargets.forEach(function (target) { revealObserver.observe(target); });
  }

  /* ---------- Timeline draw + marker highlight ---------- */
  var timelines = document.querySelectorAll(".timeline");
  if ("IntersectionObserver" in window && timelines.length) {
    timelines.forEach(function (timeline) {
      if (!prefersReducedMotion) {
        var timelineObserver = new IntersectionObserver(
          function (entries, obs) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                timeline.style.setProperty("--drawn-height", timeline.offsetHeight + "px");
                timeline.classList.add("is-drawn");
                obs.unobserve(timeline);
              }
            });
          },
          { threshold: 0.15 }
        );
        timelineObserver.observe(timeline);
      } else {
        timeline.style.setProperty("--drawn-height", timeline.offsetHeight + "px");
        timeline.classList.add("is-drawn");
      }
    });

    var itemObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    document.querySelectorAll(".timeline-item").forEach(function (item) { itemObserver.observe(item); });
  }

  /* ---------- Copy email to clipboard ---------- */
  document.querySelectorAll(".copy-btn").forEach(function (btn) {
    var feedback = btn.querySelector(".copy-feedback");
    btn.addEventListener("click", function () {
      var value = btn.getAttribute("data-copy");
      var showFeedback = function (text) {
        if (!feedback) return;
        feedback.textContent = text;
        feedback.classList.add("is-shown");
        setTimeout(function () { feedback.classList.remove("is-shown"); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(
          function () { showFeedback("Copié !"); },
          function () { showFeedback("Copie impossible"); }
        );
      } else {
        var textarea = document.createElement("textarea");
        textarea.value = value;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          showFeedback("Copié !");
        } catch (e) {
          showFeedback("Copie impossible");
        }
        document.body.removeChild(textarea);
      }
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
