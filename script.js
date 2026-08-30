const translations = {
  zh: {
    skip: "跳至正文",
    navAbout: "关于",
    navResearch: "研究",
    navEducation: "教育经历",
    navContact: "联系",
    heroEyebrow: "系统方向研究者 · 博士申请者",
    heroLineOne: "构建真正面向",
    heroLineTwo: "规模化的系统。",
    heroIntro:
      "我目前就读于南洋理工大学人工智能硕士项目，关注如何通过 Serverless 计算、虚拟化与操作系统研究，让现代计算基础设施更高效、更可靠。",
    exploreResearch: "了解我的研究方向",
    getInTouch: "与我联系",
    openStatus: "正在准备博士申请",
    currentlyAt: "目前就读于",
    aboutIndex: "关于",
    aboutTitle: "站在系统与<br />智能的交界处。",
    aboutP1: "我的研究由一个朴素的问题驱动：如何让计算基础设施适应得更快、浪费得更少，并在变化中保持可预测？",
    aboutP2:
      "本科阶段的软件工程基础与人工智能方向的研究生训练，使我尤其关注弹性云工作负载背后的系统问题——从轻量级隔离和资源管理，到运行时与网络效率。",
    factFoundation: "软件工程专业基础",
    factGraduate: "人工智能硕士学习",
    factAreas: "相互关联的研究领域",
    researchIndex: "研究",
    researchEyebrow: "研究兴趣",
    researchTitle: "为弹性计算构建<br />高效基础。",
    researchIntro:
      "我关注跨越传统系统边界的研究，连接云运行时、操作系统与计算机网络。",
    serverlessTitle: "Serverless 系统",
    serverlessBody:
      "面向细粒度、事件驱动的云工作负载，研究快速启动、自适应资源管理与可预测性能。",
    virtualizationTitle: "虚拟化与操作系统",
    virtualizationBody:
      "探索轻量级隔离、高效调度，以及面向安全多租户基础设施的操作系统支持。",
    networksTitle: "计算机网络",
    networksBody:
      "面向分布式与云原生应用，研究网络感知的系统设计和低开销数据路径。",
    educationIndex: "教育经历",
    educationTitle: "学术经历。",
    ntuDegree: "人工智能 理学硕士",
    ntuLocation: "新加坡 · 在读",
    ntuDescription:
      "在智能方法与计算系统的交叉领域展开研究生学习，重点关注系统研究。",
    uestcDegree: "软件工程 工学学士",
    uestcName: "电子科技大学",
    uestcLocation: "中国 · 成都",
    uestcDescription:
      "建立了软件工程、计算机系统以及可靠软件设计与实现方面的广泛基础。",
    contactEyebrow: "期待开启交流",
    contactTitle: "我们是否在探索<br />同一个研究问题？",
    contactBody:
      "我正在准备博士申请，希望与从事计算机系统、云计算及相关领域研究的老师和同学交流。",
    footerNote: "以好奇心设计，为开放网络构建。",
    backToTop: "返回顶部 ↑",
  },
};

const languageToggle = document.querySelector("[data-language-toggle]");
const languageCurrent = document.querySelector(".language-current");
const languageNext = document.querySelector(".language-next");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
const translatableElements = document.querySelectorAll("[data-i18n]");
const originalEnglish = {};

translatableElements.forEach((element) => {
  originalEnglish[element.dataset.i18n] = element.innerHTML.trim();
});

function setLanguage(language) {
  const isChinese = language === "zh";
  const dictionary = isChinese ? translations.zh : originalEnglish;

  translatableElements.forEach((element) => {
    const translation = dictionary[element.dataset.i18n];
    if (translation) element.innerHTML = translation;
  });

  document.documentElement.lang = isChinese ? "zh-CN" : "en";
  document.title = isChinese
    ? "Likun Zhang — 计算机系统方向研究者"
    : "Likun Zhang — Systems Researcher";
  languageCurrent.textContent = isChinese ? "中" : "EN";
  languageNext.textContent = isChinese ? "EN" : "中";
  languageToggle.setAttribute("aria-label", isChinese ? "Switch to English" : "切换到中文");
  localStorage.setItem("preferred-language", language);
}

languageToggle.addEventListener("click", () => {
  setLanguage(document.documentElement.lang.startsWith("zh") ? "en" : "zh");
});

function closeMenu() {
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

menuToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("menu-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();

const savedLanguage = localStorage.getItem("preferred-language");
if (savedLanguage === "zh") setLanguage("zh");
