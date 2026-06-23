const db = {
  street: {
    prefixes: ["callme", "madeby", "wassup", "heyy", "yk", "its", "from", "real"],
    mids: ["vibe", "drip", "laced", "hollow", "dizzy", "city", "midnight", "ghost"],
    suffixes: ["mode", "energy", "inside", "daily", "era", "zone", "nights", "files"],
  },
  soft: {
    prefixes: ["petal", "moon", "dotted", "lace", "dear", "pretty", "soft", "little"],
    mids: ["whisp", "silk", "rose", "cherry", "desire", "faery", "bloom", "mila"],
    suffixes: ["dream", "aura", "kiss", "mist", "cloud", "garden", "diary", "glow"],
  },
  lux: {
    prefixes: ["velvet", "serene", "noble", "rare", "opal", "gold", "crown", "silk"],
    mids: ["muse", "allure", "gloss", "femme", "chic", "icon", "luxe", "vogue"],
    suffixes: ["atelier", "society", "avenue", "gallery", "club", "vault", "house", "studio"],
  },
  dark: {
    prefixes: ["lostin", "possessed", "faint", "hollow", "ghoul", "midnight", "bones", "nothing"],
    mids: ["euphoria", "spirits", "mistake", "inside", "mourn", "echo", "shade", "haze"],
    suffixes: ["core", "daze", "soul", "void", "night", "trace", "being", "eyes"],
  },
  dream: {
    prefixes: ["dearest", "latte", "fairy", "starry", "calm", "lotus", "sugar", "sun"],
    mids: ["whimsi", "soft", "belle", "seraph", "dawn", "lily", "whisper", "honey"],
    suffixes: ["bloom", "faery", "heart", "diary", "glow", "light", "moon", "petal"],
  },
};

const styleRules = {
  balanced: { compactChance: 0.05, edgyChars: false, cuteTrail: false, futuristicTrail: false },
  minimal: { compactChance: 0.2, edgyChars: false, cuteTrail: false, futuristicTrail: false },
  edgy: { compactChance: 0.25, edgyChars: true, cuteTrail: false, futuristicTrail: false },
  cute: { compactChance: 0.03, edgyChars: false, cuteTrail: true, futuristicTrail: false },
  futuristic: { compactChance: 0.12, edgyChars: false, cuteTrail: false, futuristicTrail: true },
};

const templates = [
  "{a}.{b}",
  "{a}_{b}",
  "{a}{b}",
  "{a}{b}{c}",
  "{media}.{name}",
  "{name}.{media}",
  "{media}{name}",
  "{name}{media}",
  "{prefix}.{name}",
  "{name}.{suffix}",
  "{prefix}{name}",
  "{name}{suffix}",
  "{prefix}.{b}",
  "{a}{joiner}{b}",
  "{a}{joiner}{c}",
  "{name}turn",
  "{name}.jpg",
];

const connectorWords = ["of", "with", "in", "and", "x"];
const emojiCollections = {
  sparkly: ["✨", "💫", "🌟", "🫧", "🎀"],
  cute: ["🧸", "🍓", "🌸", "🩷", "🫶"],
  dreamy: ["🌙", "☁️", "🦋", "🌷", "🪐"],
  hearts: ["💖", "💘", "💌", "💕", "💗"],
  moody: ["🖤", "🌫️", "🥀", "🌌", "🕯️"],
};
const emoticonCollections = {
  cute: [":3", "^^", "uwu", "xoxo", ">_<"],
  soft: ["c:", "-.-", "^_^", "(*_*)", "(o_o)"],
  kawaii: ["(｡◕‿◕｡)", "(˶˃ ᵕ ˂˶)", "(≧◡≦)", "(｡>﹏<｡)", "(づ｡◕‿‿◕｡)づ"],
  moody: ["._.", "T_T", "-_-", "q_q", ";_;"],
  retro: [":)", ":(", ":P", ";)", ":D"],
};
const businessWords = ["studio", "co", "shop", "brand", "works", "collective", "hq", "official"];
const personalWords = ["vibes", "diary", "mood", "era", "core", "daily", "world", "archive"];
const stopWords = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "that",
  "this",
  "your",
  "you",
  "are",
  "its",
  "my",
  "our",
  "about",
  "into",
  "just",
  "very",
]);
const FONT_STORAGE_KEY = "insta_name_lab_font_prefs_v1";
const EMOJI_PREFS_KEY = "insta_name_lab_emoji_prefs_v1";
const fontMap = {
  space: '"Space Grotesk", sans-serif',
  quick: '"Quicksand", sans-serif',
  dm: '"DM Sans", sans-serif',
  poppins: '"Poppins", sans-serif',
  sora: '"Sora", sans-serif',
  nunito: '"Nunito", sans-serif',
  playfair: '"Playfair Display", serif',
  cormorant: '"Cormorant Garamond", serif',
  dancing: '"Dancing Script", cursive',
  pacifico: '"Pacifico", cursive',
};

const els = {
  theme: document.querySelector("#theme"),
  seed: document.querySelector("#seed"),
  mediaRef: document.querySelector("#mediaRef"),
  accountType: document.querySelector("#accountType"),
  userDescription: document.querySelector("#userDescription"),
  style: document.querySelector("#style"),
  length: document.querySelector("#length"),
  lengthValue: document.querySelector("#lengthValue"),
  useNumbers: document.querySelector("#useNumbers"),
  useDots: document.querySelector("#useDots"),
  useUnderscore: document.querySelector("#useUnderscore"),
  useEmoji: document.querySelector("#useEmoji"),
  emojiVibe: document.querySelector("#emojiVibe"),
  emojiPlacement: document.querySelector("#emojiPlacement"),
  customEmojis: document.querySelector("#customEmojis"),
  emojiPreview: document.querySelector("#emojiPreview"),
  emojiCopyStatus: document.querySelector("#emojiCopyStatus"),
  emoticonVibe: document.querySelector("#emoticonVibe"),
  customEmoticons: document.querySelector("#customEmoticons"),
  emoticonPreview: document.querySelector("#emoticonPreview"),
  emoticonCopyStatus: document.querySelector("#emoticonCopyStatus"),
  forceMediaRef: document.querySelector("#forceMediaRef"),
  allowDoubleWord: document.querySelector("#allowDoubleWord"),
  avoidTakenStyle: document.querySelector("#avoidTakenStyle"),
  uiFont: document.querySelector("#uiFont"),
  resultFont: document.querySelector("#resultFont"),
  generateBtn: document.querySelector("#generateBtn"),
  refreshBtn: document.querySelector("#refreshBtn"),
  results: document.querySelector("#results"),
  favorites: document.querySelector("#favorites"),
  communitySingle: document.querySelector("#communitySingle"),
  addSingleBtn: document.querySelector("#addSingleBtn"),
  communityBulk: document.querySelector("#communityBulk"),
  addBulkBtn: document.querySelector("#addBulkBtn"),
  communityFile: document.querySelector("#communityFile"),
  exportPoolBtn: document.querySelector("#exportPoolBtn"),
  poolStats: document.querySelector("#poolStats"),
  communityPool: document.querySelector("#communityPool"),
  resultItemTemplate: document.querySelector("#resultItemTemplate"),
};

const favorites = new Set();
const STORAGE_KEY = "insta_name_lab_pool_v1";
const communityPool = new Set(loadCommunityPool());

function rand(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function clean(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function extractMediaToken(text) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((part) => clean(part).slice(0, 8))
    .find((part) => part.length >= 3) || "";
}

function cleanUsername(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9._]/g, "");
}

function extractEmojis(text) {
  if (!text) {
    return [];
  }
  return [...text.matchAll(/\p{Extended_Pictographic}/gu)].map((match) => match[0]);
}

function extractCustomEmoticons(text) {
  if (!text) {
    return [];
  }
  return text
    .split(/[\n,]+/)
    .map((part) => part.trim())
    .filter((part) => part.length >= 2 && part.length <= 24);
}

function extractDescriptionTokens(text) {
  if (!text) {
    return [];
  }

  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((part) => clean(part).slice(0, 10))
    .filter((part) => part.length >= 3 && !stopWords.has(part));
}

function cleanCommunityName(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9._\p{Extended_Pictographic}]/gu, "");
}

function sanitizeLineInput(text) {
  return text
    .split(/\r?\n|,/) 
    .map((line) => cleanCommunityName(line))
    .filter((line) => line.length >= 3 && line.length <= 30);
}

function loadCommunityPool() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed.map((item) => cleanCommunityName(String(item))).filter(Boolean);
  } catch {
    return [];
  }
}

function saveCommunityPool() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...communityPool]));
}

function maybeCompact(base, chance) {
  if (Math.random() > chance) {
    return base;
  }
  return base
    .replace(/[aeiou](?=[a-z]{3,})/g, "")
    .replace(/(.)\1+/g, "$1")
    .slice(0, 14);
}

function maybeAddEdge(word, style) {
  if (!style.edgyChars) {
    return word;
  }
  const swaps = [
    ["s", "z"],
    ["x", "xx"],
    ["k", "q"],
  ];
  let next = word;
  for (const [from, to] of swaps) {
    if (next.includes(from) && Math.random() < 0.22) {
      next = next.replace(from, to);
    }
  }
  return next;
}

function maybeAddStyleTail(word, style) {
  if (style.cuteTrail && Math.random() < 0.35) {
    return `${word}${rand(["ie", "y", "pop", "bun"])}`;
  }
  if (style.futuristicTrail && Math.random() < 0.35) {
    return `${word}${rand(["x", "io", "vr", "9"])}`;
  }
  return word;
}

function maybeSeparator() {
  return rand([".", "_"]);
}

function buildFromTemplate(parts, seed, mediaToken) {
  const template = rand(templates);
  const name = seed || rand(parts.mids);
  const tokens = {
    a: rand(parts.prefixes),
    b: rand(parts.mids),
    c: rand(parts.suffixes),
    joiner: rand(["of", "with", "x"]),
    prefix: rand(["callme", "heyy", "not", "madeby", "dear", "wbu", "yk"]),
    suffix: rand(["archive", "jpg", "diary", "era", "club", "vibe", "mode", "files"]),
    media: mediaToken || rand(parts.mids),
    name,
  };

  return template.replace(/\{(\w+)\}/g, (_, key) => tokens[key] || "");
}

function buildBase(theme, seed, allowDoubleWord, mediaToken) {
  const parts = db[theme];
  const base = buildFromTemplate(parts, seed, mediaToken);

  if (!allowDoubleWord && (base.includes(".") || base.includes("_"))) {
    return base.replace(/[._]/g, "");
  }

  if (allowDoubleWord && Math.random() < 0.22) {
    return `${base}${rand(connectorWords)}${rand(parts.mids)}`;
  }

  return base;
}

function resolveSeparatorMode() {
  const allowDots = els.useDots.checked;
  const allowUnderscore = els.useUnderscore.checked;

  if (allowDots && allowUnderscore) {
    return rand([".", "_"]);
  }
  if (allowDots) {
    return ".";
  }
  if (allowUnderscore) {
    return "_";
  }
  return "";
}

function maybeRemixCommunity(name) {
  if (!communityPool.size || Math.random() > 0.4) {
    return name;
  }
  const pick = rand([...communityPool]);
  const base = pick.replace(/[^a-z0-9]/g, "");
  if (!base) {
    return name;
  }
  return Math.random() < 0.5 ? `${name}${base.slice(0, 4)}` : `${base.slice(0, 5)}${name}`;
}

function normalizeLength(name, target) {
  if (name.length > target) {
    return name.slice(0, target);
  }
  return name;
}

function enforceRequiredToken(name, rawToken, separatorChoice, target) {
  if (!rawToken) {
    return name;
  }

  const minStem = Math.min(3, target);
  const stemMax = Math.max(minStem, target - 2);
  const token = clean(rawToken).slice(0, Math.min(8, stemMax));
  if (!token) {
    return name;
  }

  if (name.includes(token)) {
    return name;
  }

  const joiner = separatorChoice || "";
  const availableTail = Math.max(0, target - token.length - (joiner ? 1 : 0));
  const tail = name.replace(/[._]/g, "").slice(0, availableTail);
  return `${token}${joiner}${tail}`;
}

function loadFontPrefs() {
  try {
    const raw = localStorage.getItem(FONT_STORAGE_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    if (parsed.uiFont && fontMap[parsed.uiFont]) {
      els.uiFont.value = parsed.uiFont;
    }
    if (parsed.resultFont && fontMap[parsed.resultFont]) {
      els.resultFont.value = parsed.resultFont;
    }
  } catch {
    // Ignore invalid saved values.
  }
}

function applyFontPrefs() {
  const uiFont = fontMap[els.uiFont.value] || fontMap.space;
  const resultFont = fontMap[els.resultFont.value] || fontMap.dancing;
  document.documentElement.style.setProperty("--ui-font", uiFont);
  document.documentElement.style.setProperty("--result-font", resultFont);
  localStorage.setItem(
    FONT_STORAGE_KEY,
    JSON.stringify({ uiFont: els.uiFont.value, resultFont: els.resultFont.value })
  );
}

function getActiveEmojiPool() {
  const selectedVibe = emojiCollections[els.emojiVibe.value] || emojiCollections.sparkly;
  const custom = extractEmojis(els.customEmojis.value);
  return [...new Set([...selectedVibe, ...custom])];
}

function getActiveEmoticonPool() {
  const selectedVibe = emoticonCollections[els.emoticonVibe.value] || emoticonCollections.cute;
  const custom = extractCustomEmoticons(els.customEmoticons.value);
  return [...new Set([...selectedVibe, ...custom])];
}

function renderEmojiPreview() {
  const pool = getActiveEmojiPool();
  els.emojiPreview.innerHTML = "";
  els.emojiCopyStatus.textContent = "";

  for (const emoji of pool.slice(0, 12)) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "emoji-chip";
    chip.textContent = emoji;
    chip.title = `Copy ${emoji}`;
    chip.addEventListener("click", async () => {
      await copyToClipboard(emoji);
      chip.classList.add("copied");
      els.emojiCopyStatus.textContent = `${emoji} copied`;
      setTimeout(() => {
        chip.classList.remove("copied");
      }, 700);
    });
    els.emojiPreview.append(chip);
  }
}

function renderEmoticonPreview() {
  const pool = getActiveEmoticonPool();
  els.emoticonPreview.innerHTML = "";
  els.emoticonCopyStatus.textContent = "";

  for (const emoticon of pool.slice(0, 12)) {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "emoticon-chip";
    chip.textContent = emoticon;
    chip.title = `Copy ${emoticon}`;
    chip.addEventListener("click", async () => {
      await copyToClipboard(emoticon);
      chip.classList.add("copied");
      els.emoticonCopyStatus.textContent = `${emoticon} copied`;
      setTimeout(() => {
        chip.classList.remove("copied");
      }, 700);
    });
    els.emoticonPreview.append(chip);
  }
}

function saveEmojiPrefs() {
  localStorage.setItem(
    EMOJI_PREFS_KEY,
    JSON.stringify({
      vibe: els.emojiVibe.value,
      placement: els.emojiPlacement.value,
      custom: els.customEmojis.value,
      emoticonVibe: els.emoticonVibe.value,
      customEmoticons: els.customEmoticons.value,
    })
  );
}

function loadEmojiPrefs() {
  try {
    const raw = localStorage.getItem(EMOJI_PREFS_KEY);
    if (!raw) {
      return;
    }
    const parsed = JSON.parse(raw);
    if (parsed.vibe && emojiCollections[parsed.vibe]) {
      els.emojiVibe.value = parsed.vibe;
    }
    if (parsed.placement && ["end", "both", "random"].includes(parsed.placement)) {
      els.emojiPlacement.value = parsed.placement;
    }
    if (typeof parsed.custom === "string") {
      els.customEmojis.value = parsed.custom;
    }
    if (parsed.emoticonVibe && emoticonCollections[parsed.emoticonVibe]) {
      els.emoticonVibe.value = parsed.emoticonVibe;
    }
    if (typeof parsed.customEmoticons === "string") {
      els.customEmoticons.value = parsed.customEmoticons;
    }
  } catch {
    // Ignore invalid saved values.
  }
}

function applyEmojiToHandle(handle) {
  if (!els.useEmoji.checked) {
    return handle;
  }

  const pool = getActiveEmojiPool();
  if (!pool.length) {
    return handle;
  }

  const first = rand(pool);
  const second = rand(pool);
  const placement = els.emojiPlacement.value;

  if (placement === "both") {
    return `${first}${handle}${second}`;
  }
  if (placement === "random") {
    return Math.random() < 0.5 ? `${first}${handle}` : `${handle}${first}`;
  }
  return `${handle}${first}`;
}

function applyEmoticonToHandle(handle) {
  const pool = getActiveEmoticonPool();
  if (!pool.length) {
    return handle;
  }

  const first = rand(pool);
  const second = rand(pool);
  const placement = els.emojiPlacement.value;

  if (placement === "both") {
    return `${first}${handle}${second}`;
  }
  if (placement === "random") {
    return Math.random() < 0.5 ? `${first}${handle}` : `${handle}${first}`;
  }
  return `${handle}${first}`;
}

function applyAccountProfile(name, accountType, descriptionToken, separatorChoice) {
  const sep = separatorChoice || "";

  if (accountType === "business") {
    const brandWord = descriptionToken || rand(businessWords);
    const patterns = [
      `${brandWord}${sep}${name}`,
      `${name}${sep}${brandWord}`,
      `${name}${sep}${rand(["official", "studio", "co", "shop"])}`,
    ];
    return rand(patterns).replace(/[._]{2,}/g, sep || "");
  }

  const personalWord = descriptionToken || rand(personalWords);
  const patterns = [
    `${name}${sep}${personalWord}`,
    `${rand(["its", "hey", "im", "just"]) }${sep}${name}`,
    `${personalWord}${sep}${name}`,
  ];
  return rand(patterns).replace(/[._]{2,}/g, sep || "");
}

function generateOne() {
  const theme = els.theme.value;
  const seed = clean(els.seed.value.trim()).slice(0, 8);
  const mediaToken = extractMediaToken(els.mediaRef.value.trim());
  const accountType = els.accountType.value;
  const descriptionTokens = extractDescriptionTokens(els.userDescription.value.trim());
  const descriptionToken = descriptionTokens[0] || "";
  const style = styleRules[els.style.value];
  const targetLength = Number(els.length.value);

  let name = buildBase(theme, seed, els.allowDoubleWord.checked, mediaToken).toLowerCase();
  name = maybeRemixCommunity(name);

  const separatorChoice = resolveSeparatorMode();
  if (!separatorChoice) {
    name = name.replace(/[._]/g, "");
  } else {
    name = name.replace(/[._]/g, separatorChoice);
  }

  name = applyAccountProfile(name, accountType, descriptionToken, separatorChoice);

  name = name.replace(/[^a-z0-9._]/g, "");
  name = maybeCompact(name, style.compactChance);
  name = maybeAddEdge(name, style);
  name = maybeAddStyleTail(name, style);

  if (separatorChoice && name.length > 6 && !/[._]/.test(name) && Math.random() < 0.5) {
    const split = Math.max(3, Math.min(name.length - 3, Math.floor(name.length / 2)));
    name = `${name.slice(0, split)}${separatorChoice}${name.slice(split)}`;
  }

  if (els.useNumbers.checked && Math.random() < 0.45) {
    name += String(rand([7, 8, 9, 10, 11, 13, 17, 21, 24, 27]));
  }

  if (els.avoidTakenStyle.checked && Math.random() < 0.55) {
    name += rand(["core", "era", "files", "diary", "page", "room", "hq"]);
  }

  name = normalizeLength(name, targetLength);
  if (els.forceMediaRef.checked && mediaToken) {
    name = enforceRequiredToken(name, mediaToken, separatorChoice, targetLength);
  }
  if (seed) {
    name = enforceRequiredToken(name, seed, separatorChoice, targetLength);
  }
  if (descriptionToken) {
    name = enforceRequiredToken(name, descriptionToken, separatorChoice, targetLength);
  }

  const baseHandle = cleanUsername(name);
  if (!baseHandle) {
    return "vibe.room";
  }

  if (els.useEmoji.checked && Math.random() < 0.55) {
    return Math.random() < 0.65 ? applyEmojiToHandle(baseHandle) : applyEmoticonToHandle(baseHandle);
  }

  return baseHandle;
}

function generateBatch(count = 12) {
  const names = new Set();
  let safety = 0;

  while (names.size < count && safety < 500) {
    names.add(generateOne());
    safety += 1;
  }

  return [...names];
}

function writeFavorites() {
  els.favorites.innerHTML = "";

  if (!favorites.size) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No favorites yet.";
    els.favorites.append(li);
    return;
  }

  for (const username of favorites) {
    const li = document.createElement("li");
    li.className = "favorite-item";
    li.innerHTML = `<span>${username}</span><button class="copy">Copy</button>`;
    li.querySelector("button").addEventListener("click", () => copyToClipboard(username));
    els.favorites.append(li);
  }
}

function writeCommunityPool() {
  els.communityPool.innerHTML = "";
  const pool = [...communityPool];
  els.poolStats.textContent = `${pool.length} usernames available in community pool.`;

  if (!pool.length) {
    const li = document.createElement("li");
    li.className = "empty";
    li.textContent = "No community usernames yet. Add some above.";
    els.communityPool.append(li);
    return;
  }

  for (const username of pool.slice(0, 60)) {
    const li = document.createElement("li");
    li.className = "favorite-item";
    li.innerHTML = `<span>${username}</span><button class="copy">Copy</button>`;
    li.querySelector("button").addEventListener("click", () => copyToClipboard(username));
    els.communityPool.append(li);
  }
}

function addUsernamesToPool(list) {
  let added = 0;
  for (const item of list) {
    if (!item) {
      continue;
    }
    if (!communityPool.has(item)) {
      communityPool.add(item);
      added += 1;
    }
  }
  if (added) {
    saveCommunityPool();
    writeCommunityPool();
  }
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const tmp = document.createElement("textarea");
    tmp.value = text;
    document.body.append(tmp);
    tmp.select();
    document.execCommand("copy");
    tmp.remove();
  }
}

function renderResults() {
  const batch = generateBatch(12);
  els.results.innerHTML = "";

  for (const username of batch) {
    const fragment = els.resultItemTemplate.content.cloneNode(true);
    const userEl = fragment.querySelector(".username");
    const copyBtn = fragment.querySelector(".copy");
    const saveBtn = fragment.querySelector(".save");

    userEl.textContent = username;

    copyBtn.addEventListener("click", async () => {
      await copyToClipboard(username);
      copyBtn.textContent = "Copied";
      setTimeout(() => {
        copyBtn.textContent = "Copy";
      }, 850);
    });

    saveBtn.addEventListener("click", () => {
      if (favorites.has(username)) {
        favorites.delete(username);
        saveBtn.textContent = "☆";
      } else {
        favorites.add(username);
        saveBtn.textContent = "★";
      }
      writeFavorites();
    });

    els.results.append(fragment);
  }
}

els.length.addEventListener("input", () => {
  els.lengthValue.textContent = els.length.value;
});

function handleEmojiSettingsChange() {
  renderEmojiPreview();
  renderEmoticonPreview();
  saveEmojiPrefs();
}

els.uiFont.addEventListener("change", applyFontPrefs);
els.resultFont.addEventListener("change", applyFontPrefs);
els.emojiVibe.addEventListener("change", handleEmojiSettingsChange);
els.emojiPlacement.addEventListener("change", handleEmojiSettingsChange);
els.customEmojis.addEventListener("input", handleEmojiSettingsChange);
els.emoticonVibe.addEventListener("change", handleEmojiSettingsChange);
els.customEmoticons.addEventListener("input", handleEmojiSettingsChange);

els.addSingleBtn.addEventListener("click", () => {
  const value = cleanCommunityName(els.communitySingle.value);
  if (!value) {
    return;
  }
  addUsernamesToPool([value]);
  els.communitySingle.value = "";
});

els.addBulkBtn.addEventListener("click", () => {
  const list = sanitizeLineInput(els.communityBulk.value);
  addUsernamesToPool(list);
  els.communityBulk.value = "";
});

els.communityFile.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  const text = await file.text();
  let list = [];

  if (file.name.toLowerCase().endsWith(".json")) {
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) {
        list = parsed.map((item) => cleanCommunityName(String(item))).filter(Boolean);
      }
    } catch {
      list = [];
    }
  } else {
    list = sanitizeLineInput(text);
  }

  addUsernamesToPool(list);
  event.target.value = "";
});

els.exportPoolBtn.addEventListener("click", () => {
  const blob = new Blob([JSON.stringify([...communityPool], null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "insta-name-community-pool.json";
  a.click();
  URL.revokeObjectURL(url);
});

els.generateBtn.addEventListener("click", renderResults);
els.refreshBtn.addEventListener("click", renderResults);

loadFontPrefs();
applyFontPrefs();
loadEmojiPrefs();
renderEmojiPreview();
renderEmoticonPreview();
writeFavorites();
writeCommunityPool();
renderResults();
