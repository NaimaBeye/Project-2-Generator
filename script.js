// Username Generator Data
const wordbanks = {
  cool: {
    prefixes: ["callme", "itsme", "hey", "im", "just", "only", "very", "so", "that", "this", "check", "viral"],
    mids: ["vibe", "mood", "energy", "wave", "flux", "sync", "pulse", "drift", "flow", "hype", "era", "state"],
    suffixes: ["era", "mode", "zone", "diary", "core", "soul", "spirit", "realm", "lore", "arc", "era", "culture"],
  },
  aesthetic: {
    prefixes: ["moon", "star", "petal", "lace", "rose", "silk", "soft", "dear", "pearl", "grace", "ivory", "velvet"],
    mids: ["dream", "glow", "bloom", "kiss", "whisper", "light", "grace", "aura", "mist", "haze", "dew", "bloom"],
    suffixes: ["diary", "garden", "cloud", "mist", "fairy", "angel", "heart", "soul", "tale", "spell", "bloom", "essence"],
  },
  edgy: {
    prefixes: ["dark", "lost", "hollow", "cold", "mystic", "rebel", "rogue", "strange", "toxic", "void", "midnight", "chaos"],
    mids: ["night", "shadow", "void", "storm", "flame", "echo", "moan", "daze", "rage", "sin", "curse", "hex"],
    suffixes: ["core", "soul", "night", "daze", "lair", "void", "haze", "curse", "mark", "bane", "dark", "reign"],
  },
  playful: {
    prefixes: ["happy", "silly", "funny", "cheeky", "bouncy", "sunny", "quirky", "peppy", "bubbly", "giggle", "jazzy", "perky"],
    mids: ["buddy", "friend", "love", "joy", "party", "fun", "play", "dance", "laugh", "twirl", "skip", "hop"],
    suffixes: ["zone", "club", "fest", "party", "hub", "land", "world", "corner", "place", "space", "house", "palace"],
  },
  minimal: {
    prefixes: ["ali", "ava", "max", "alex", "ana", "leo", "sam", "raw", "kai", "ash", "sky", "zen"],
    mids: ["tech", "lab", "hub", "co", "net", "dev", "io", "sys", "web", "app", "code", "flow"],
    suffixes: ["code", "flow", "craft", "work", "space", "hub", "lab", "studio", "works", "studio", "craft", "arts"],
  },
  cyberpunk: {
    prefixes: ["neo", "cyber", "byte", "hack", "neon", "pixel", "digital", "virus", "code", "sync", "glitch", "net"],
    mids: ["punk", "wave", "tech", "surge", "flux", "pulse", "zone", "grid", "scan", "shock", "drive", "net"],
    suffixes: ["core", "punk", "ware", "tech", "grid", "sync", "drive", "net", "wave", "force", "code", "sphere"],
  },
  cottagecore: {
    prefixes: ["honey", "wild", "grove", "meadow", "rustic", "garden", "cozy", "willow", "autumn", "spring", "harvest", "field"],
    mids: ["lane", "path", "bloom", "vine", "leaf", "moss", "rose", "daisy", "wheat", "birch", "oak", "willow"],
    suffixes: ["cottage", "gate", "barn", "field", "grove", "garden", "hearth", "nest", "folk", "lore", "shire", "haven"],
  },
  vintage: {
    prefixes: ["retro", "classic", "old", "antique", "belle", "dapper", "grand", "victorian", "nostalgia", "timeless", "rare", "precious"],
    mids: ["tale", "love", "charm", "grace", "spirit", "heart", "soul", "style", "art", "craft", "keeper", "seeker"],
    suffixes: ["keeper", "soul", "heart", "belle", "lore", "craft", "ware", "post", "shop", "gallery", "studio", "parlor"],
  },
  fantasy: {
    prefixes: ["mystic", "dragon", "elven", "wizard", "fairy", "enchant", "magic", "curse", "spell", "phoenix", "rune", "ancient"],
    mids: ["realm", "quest", "magic", "curse", "spell", "scroll", "rune", "myth", "lore", "tale", "legend", "saga"],
    suffixes: ["realm", "quest", "crown", "throne", "tower", "castle", "scroll", "mage", "knight", "sage", "lord", "keeper"],
  },
  darkacademia: {
    prefixes: ["scholar", "library", "ancient", "secret", "old", "oxford", "elite", "noble", "raven", "crimson", "autumn", "twilight"],
    mids: ["tale", "lore", "wisdom", "spell", "study", "art", "craft", "legacy", "secret", "mystery", "soul", "heart"],
    suffixes: ["scholar", "keeper", "sage", "master", "elder", "lore", "craft", "keeper", "seeker", "student", "apprentice", "guildhall"],
  },
  retro: {
    prefixes: ["funky", "groovy", "disco", "neon", "retro", "rad", "totally", "bodacious", "tubular", "righteous", "awesome", "gnarly"],
    mids: ["baby", "daze", "love", "vibes", "spirit", "soul", "mode", "zone", "wave", "groove", "trip", "beat"],
    suffixes: ["groove", "beat", "zone", "trip", "dial", "studio", "pad", "shack", "club", "disco", "night", "scene"],
  },
};

const emojiSet = ["✨", "🌙", "💫", "🎀", "🌸", "💖", "🫧", "🦋", "🌟", "💝", "🎵", "🌺", "💕", "🍭", "💎", "🌈", "🔮", "⭐", "💗", "🎀"];

const emoticonSet = [":)", ":D", "XD", "<3", ";)", ":P", "^_^", ":*", "o_o", ":(", "T_T", ":-[", ":O", "o.o", "ಠ_ಠ", "(ノಠ益ಠ)ノ", "(╯°□°)╯︵ ┻━┻", "(´・ω・`)", "(´；ω；`)", "¯\\_(ツ)_/¯", "(≧▽≦)", "(✿◠‿◠)", "(๑•́ ω •̀๑)", "(*´▽`*)", ":3", "(´∀`)♡", "(´；ω；`)", "ฅ(๑*▽*๑)ฅ"];

const favorites = new Set();
const communityPool = new Map();
const STORAGE_KEY = "insta_generator_favorites";
const COMMUNITY_KEY = "insta_generator_community";
const COMMUNITY_USER_KEY = "insta_generator_user_id";
const currentUserId = getOrCreateCommunityUserId();

function getOrCreateCommunityUserId() {
  const existing = localStorage.getItem(COMMUNITY_USER_KEY);
  if (existing) return existing;
  const generated = `user_${Math.random().toString(36).slice(2, 10)}`;
  localStorage.setItem(COMMUNITY_USER_KEY, generated);
  return generated;
}

// DOM Elements
const themeSelect = document.getElementById("theme");
const accountTypeSelect = document.getElementById("accountType");
const descriptionInput = document.getElementById("description");
const coreWordInput = document.getElementById("coreWord");
const mediaRefInput = document.getElementById("mediaRef");
const styleSelect = document.getElementById("style");
const lengthInput = document.getElementById("length");
const lengthValue = document.getElementById("lengthValue");
const includeNumbersCheckbox = document.getElementById("includeNumbers");
const includeDotsCheckbox = document.getElementById("includeDots");
const includeUnderscoresCheckbox = document.getElementById("includeUnderscores");
const includeEmojiCheckbox = document.getElementById("includeEmoji");
const includeEmoticonsCheckbox = document.getElementById("includeEmoticons");
const uiFontSelect = document.getElementById("uiFont");
const resultFontSelect = document.getElementById("resultFont");
const emojiColorSelect = document.getElementById("emojiColor");
const emojiThemeSection = document.getElementById("emojiThemeSection");
const emojiStudio = document.getElementById("emojiStudio");
const emojiGrid = document.getElementById("emojiGrid");
const emoticonGrid = document.getElementById("emoticonGrid");
const emojiHint = document.getElementById("emojiHint");
const emoticonHint = document.getElementById("emoticonHint");
const generateBtn = document.getElementById("generateBtn");
const refreshBtn = document.getElementById("refreshBtn");
const copyAllBtn = document.getElementById("copyAllBtn");
const resultsList = document.getElementById("resultsList");
const favoritesList = document.getElementById("favoritesList");
const communityInput = document.getElementById("communityInput");
const addCommunityBtn = document.getElementById("addCommunityBtn");
const exportPoolBtn = document.getElementById("exportPoolBtn");
const communityPoolEl = document.getElementById("communityPool");
const usernameTemplate = document.getElementById("usernameTemplate");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadFontPrefs();
  loadFavorites();
  loadCommunityPool();
  renderFavorites();
  renderCommunityPool();
  renderEmojiStudio();
  applyFonts();
  generateUsernames();

  lengthInput.addEventListener("input", (e) => {
    lengthValue.textContent = e.target.value;
    generateUsernames();
  });

  uiFontSelect.addEventListener("change", applyFonts);
  resultFontSelect.addEventListener("change", applyFonts);
  includeEmojiCheckbox.addEventListener("change", () => {
    emojiStudio.style.display = includeEmojiCheckbox.checked || includeEmoticonsCheckbox.checked ? "block" : "none";
    emojiThemeSection.style.display = includeEmojiCheckbox.checked ? "block" : "none";
    renderEmojiStudio();
  });
  includeEmoticonsCheckbox.addEventListener("change", () => {
    emojiStudio.style.display = includeEmojiCheckbox.checked || includeEmoticonsCheckbox.checked ? "block" : "none";
    renderEmojiStudio();
  });
  emojiColorSelect.addEventListener("change", renderEmojiStudio);
  addCommunityBtn.addEventListener("click", addToCommunity);
  exportPoolBtn.addEventListener("click", exportCommunityPool);

  generateBtn.addEventListener("click", generateUsernames);
  refreshBtn.addEventListener("click", generateUsernames);
  copyAllBtn.addEventListener("click", copyAllUsernames);
});

// Utility Functions
function rand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function cleanText(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function enforceExactLength(username, targetLength, bank) {
  let value = username;

  if (value.length > targetLength) {
    value = value.slice(0, targetLength);
  }

  if (value.length < targetLength) {
    const filler = cleanText(`${rand(bank.mids)}${rand(bank.suffixes)}${rand(bank.prefixes)}`) || "x";
    let i = 0;
    while (value.length < targetLength) {
      value += filler[i % filler.length];
      i += 1;
    }
  }

  return value;
}

function applyCharacterToggles(username) {
  let value = username;

  if (!includeDotsCheckbox.checked) {
    value = value.replace(/\./g, "");
  }

  if (!includeUnderscoresCheckbox.checked) {
    value = value.replace(/_/g, "");
  }

  if (!includeNumbersCheckbox.checked) {
    value = value.replace(/[0-9]/g, "");
  }

  return value;
}

function ensureDotWhenEnabled(username) {
  if (!includeDotsCheckbox.checked) return username;
  if (username.includes(".")) return username;
  if (username.length < 2) return username;

  const split = Math.floor(username.length / 2);
  return `${username.slice(0, split)}.${username.slice(split)}`;
}

function enforceRequiredTokens(username, tokens, targetLength) {
  const required = tokens.filter(Boolean);
  if (required.length === 0) return username;

  if (required.every((token) => cleanText(username).includes(token))) return username;

  const separator = username.includes(".") ? "." : username.includes("_") ? "_" : "";
  let rebuilt = username;

  required.forEach((token) => {
    if (!cleanText(rebuilt).includes(token)) {
      const plain = cleanText(rebuilt);
      const split = Math.floor(plain.length / 2);
      const patterns = [
        separator ? `${token}${separator}${plain}` : `${token}${plain}`,
        separator ? `${plain}${separator}${token}` : `${plain}${token}`,
        separator
          ? `${plain.slice(0, split)}${separator}${token}${separator}${plain.slice(split)}`
          : `${plain.slice(0, split)}${token}${plain.slice(split)}`,
      ];
      rebuilt = rand(patterns);
    }
  });

  // Keep length preference when possible, but never at the cost of dropping required tokens.
  if (rebuilt.length > targetLength) {
    const trimmed = rebuilt.slice(0, targetLength);
    if (required.every((token) => cleanText(trimmed).includes(token))) {
      rebuilt = trimmed;
    }
  }

  return rebuilt;
}

function generateUsername() {
  const theme = themeSelect.value;
  const coreWord = cleanText(coreWordInput.value).slice(0, 12);
  const mediaRef = cleanText(mediaRefInput.value).slice(0, 12);
  const style = styleSelect.value;
  const requestedLength = parseInt(lengthInput.value, 10);
  const targetLength = Math.max(3, requestedLength);
  const bank = wordbanks[theme];

  let username = "";

  if (coreWord && mediaRef) {
    const prefix = rand(bank.prefixes);
    const mid = rand(bank.mids);
    const suffix = rand(bank.suffixes);
    const patterns = [
      `${mediaRef}.${coreWord}${suffix}`,
      `${coreWord}_${mediaRef}`,
      `${prefix}${mediaRef}${suffix}`,
      `${mid}.${mediaRef}.${coreWord}`,
      `${coreWord}${mid}${mediaRef}`,
      `${mediaRef}${mid}${coreWord}`,
    ];
    username = rand(patterns);
  } else if (coreWord) {
    // Use core word as base
    const prefix = rand(bank.prefixes);
    const suffix = rand(bank.suffixes);
    const patterns = [
      `${prefix}.${coreWord}`,
      `${coreWord}${suffix}`,
      `${coreWord}_${rand(bank.mids)}`,
      `${prefix}${coreWord}`,
    ];
    username = rand(patterns);
  } else if (mediaRef) {
    // Use media reference in varied positions
    const prefix = rand(bank.prefixes);
    const mid = rand(bank.mids);
    const suffix = rand(bank.suffixes);
    const patterns = [
      `${mediaRef}${suffix}`,
      `${prefix}${mediaRef}`,
      `${mid}.${mediaRef}`,
      `${mediaRef}_${mid}`,
      `${suffix}${mediaRef}`,
      `${mid}${mediaRef}${suffix}`,
    ];
    username = rand(patterns);
  } else {
    // Random generation
    const prefix = rand(bank.prefixes);
    const mid = rand(bank.mids);
    const suffix = rand(bank.suffixes);

    const patterns = [
      `${prefix}${mid}`,
      `${mid}.${suffix}`,
      `${prefix}_${suffix}`,
      `${mid}${suffix}`,
    ];
    username = rand(patterns);
  }

  // Apply style modifications
  username = applyStyle(username, style);

  // Add separators (but not if already has them from style)
  if (!username.includes(".") && !username.includes("_")) {
    if (includeDotsCheckbox.checked && Math.random() > 0.5 && username.length > 5) {
      const splitPoint = Math.floor(username.length / 2);
      username = `${username.slice(0, splitPoint)}.${username.slice(splitPoint)}`;
    } else if (includeUnderscoresCheckbox.checked && Math.random() > 0.5 && username.length > 5) {
      const splitPoint = Math.floor(username.length / 2);
      username = `${username.slice(0, splitPoint)}_${username.slice(splitPoint)}`;
    }
  }

  // Add numbers
  if (includeNumbersCheckbox.checked && Math.random() > 0.4) {
    username += rand([7, 8, 9, 13, 24, 99, 2023, 2024]);
  }

  // Add emoji
  if (includeEmojiCheckbox.checked && Math.random() > 0.6) {
    username += rand(emojiSet);
  }

  // Add emoticons
  if (includeEmoticonsCheckbox.checked && Math.random() > 0.6) {
    username += rand(emoticonSet);
  }

  // Normalize length
  if (username.length > targetLength) {
    username = username.slice(0, targetLength);
  }

  // Remove invalid characters (except emoji)
  username = username.replace(/[^a-z0-9._]/g, (match) => {
    if (emojiSet.includes(match)) return match;
    return "";
  });

  // Final guard: include required user terms when provided.
  username = enforceRequiredTokens(username, [coreWord, mediaRef], targetLength);

  // Respect dot/underscore/number toggles even if styles/patterns introduced them.
  username = applyCharacterToggles(username);

  // When enabled, dot should always be included.
  username = ensureDotWhenEnabled(username);

  // Ensure final output still honors the resolved target length.
  username = enforceExactLength(username, targetLength, bank);

  return username.length >= 3 ? username : generateUsername();
}

function applyStyle(username, style) {
  switch (style) {
    case "minimalist":
      // Keep it simple and short - no extra modifications
      return username.length > 10 ? username.slice(0, 10) : username;
    case "elegant":
      // Add a separator for elegant look
      if (username.length > 6 && !username.includes(".") && !username.includes("_")) {
        const split = Math.floor(username.length / 2);
        return `${username.slice(0, split)}.${username.slice(split)}`;
      }
      return username;
    case "playful":
      // Double a random consonant for playful vibe
      const consonants = username.match(/[bcdfghjklmnpqrstvwxyz]/gi) || [];
      if (consonants.length > 0) {
        const randomConsonant = consonants[Math.floor(Math.random() * consonants.length)];
        const index = username.indexOf(randomConsonant);
        if (index !== -1) {
          return username.slice(0, index + 1) + randomConsonant + username.slice(index + 1);
        }
      }
      return username;
    case "cosmic":
      // Add cosmic sparkle with asterisks
      const splitCosmic = Math.floor(username.length / 2);
      return `✨${username.slice(0, splitCosmic)}✨${username.slice(splitCosmic)}`;
    case "dreamy":
      // Add soft separator with tildes
      if (username.length > 5) {
        const splitDreamy = Math.floor(username.length / 2);
        return `${username.slice(0, splitDreamy)}~${username.slice(splitDreamy)}`;
      }
      return username;
    case "edgy":
      // Make it edgy with dashes and alternating caps
      let edgyUsername = "";
      for (let i = 0; i < username.length; i++) {
        edgyUsername += i % 2 === 0 ? username[i].toUpperCase() : username[i].toLowerCase();
      }
      return edgyUsername;
    case "aesthetic":
      // Capitalize first letters for aesthetic appeal
      return username
        .split(/(?=[A-Z])|[._\-]/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join("");
    case "balanced":
    default:
      return username;
  }
}

function generateUsernames() {
  const usernames = new Set();
  const maxAttempts = 200;
  let attempts = 0;

  while (usernames.size < 12 && attempts < maxAttempts) {
    const username = generateUsername();
    usernames.add(username);
    attempts++;
  }

  renderResults([...usernames]);
}

function copyAllUsernames() {
  const allUsernames = Array.from(resultsList.querySelectorAll(".username-text"))
    .map(el => el.textContent)
    .join("\n");
  
  if (allUsernames.length === 0) {
    showCopyFeedback("No usernames to copy!");
    return;
  }
  
  copyToClipboard(allUsernames);
  showCopyFeedback("All usernames copied!");
}

function renderResults(usernames) {
  resultsList.innerHTML = "";

  usernames.forEach((username) => {
    const clone = usernameTemplate.content.cloneNode(true);
    const usernameText = clone.querySelector(".username-text");
    const copyBtn = clone.querySelector(".btn-copy");
    const favoriteBtn = clone.querySelector(".btn-favorite");

    usernameText.textContent = username;

    copyBtn.addEventListener("click", () => {
      copyToClipboard(username);
    });

    favoriteBtn.addEventListener("click", () => {
      toggleFavorite(username, favoriteBtn);
    });

    // Update favorite button state
    if (favorites.has(username)) {
      favoriteBtn.classList.add("saved");
      favoriteBtn.textContent = "♥";
    }

    resultsList.appendChild(clone);
  });
}

function renderFavorites() {
  favoritesList.innerHTML = "";

  if (favorites.size === 0) {
    favoritesList.innerHTML = '<div class="empty-state">No favorites yet. Click ♡ to save usernames!</div>';
    return;
  }

  favorites.forEach((username) => {
    const li = document.createElement("li");
    li.className = "favorite-item";

    const span = document.createElement("span");
    span.className = "favorite-text";
    span.textContent = username;

    const copyBtn = document.createElement("button");
    copyBtn.className = "btn-copy";
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", () => {
      copyToClipboard(username);
    });

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn-favorite saved";
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => {
      removeFavorite(username);
    });

    li.appendChild(span);
    li.appendChild(copyBtn);
    li.appendChild(removeBtn);
    favoritesList.appendChild(li);
  });
}

function toggleFavorite(username, btn) {
  if (favorites.has(username)) {
    favorites.delete(username);
    btn.classList.remove("saved");
    btn.textContent = "♡";
  } else {
    favorites.add(username);
    btn.classList.add("saved");
    btn.textContent = "♥";
    renderFavorites();
  }
  saveFavorites();
}

function removeFavorite(username) {
  favorites.delete(username);
  saveFavorites();
  renderFavorites();
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showCopyFeedback();
  });
}

function showCopyFeedback(message = "Copied to clipboard!") {
  const feedback = document.createElement("div");
  feedback.className = "copy-feedback";
  feedback.textContent = message;
  document.body.appendChild(feedback);

  setTimeout(() => {
    feedback.remove();
  }, 2000);
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...favorites]));
}

function loadFavorites() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.forEach((fav) => favorites.add(fav));
    }
  } catch (e) {
    console.error("Error loading favorites:", e);
  }
}

function getFilteredEmojis() {
  const emojisByColor = {
    all: emojiSet,
    red: ["❤️", "🔴", "🌹", "🍎", "🎈", "🍒", "🌶️", "💋"],
    orange: ["🟠", "🧡", "🔥", "🍊", "🥕", "🎃", "🦊", "🏮"],
    yellow: ["🟡", "💛", "⭐", "🌻", "🌼", "⚡", "🌟", "🍯"],
    green: ["🟢", "💚", "🌿", "🌲", "🌳", "🍀", "🥦", "🫛"],
    blue: ["🔵", "💙", "🌊", "🫐", "🦋", "🐟", "🧿", "🌀"],
    violet: ["🟣", "💜", "🪻", "🔮", "👾", "🍇", "☂️", "♈"],
    white: ["⚪", "🤍", "🐑", "👻", "🕊️", "☁️", "🦢", "🥥"],
    pink: ["🩷", "💕", "💖", "💗", "🦩", "🐷", "🩰", "🌸"],
    black: ["⚫", "🖤", "🐈‍⬛", "🐦‍⬛", "🎩", "🌑", "♠️", "🕷️"],
  };
  return emojisByColor[emojiColorSelect.value] || emojiSet;
}

function renderEmojiStudio() {
  // Only show emojis if includeEmoji is checked
  emojiHint.style.display = includeEmojiCheckbox.checked ? "block" : "none";
  emojiGrid.innerHTML = "";
  if (includeEmojiCheckbox.checked) {
    const filteredEmojis = getFilteredEmojis();
    filteredEmojis.forEach((emoji) => {
      const btn = document.createElement("button");
      btn.className = "emoji-btn";
      btn.textContent = emoji;
      btn.addEventListener("click", () => {
        copyToClipboard(emoji);
      });
      emojiGrid.appendChild(btn);
    });
  }

  // Only show emoticons if includeEmoticons is checked
  emoticonHint.style.display = includeEmoticonsCheckbox.checked ? "block" : "none";
  emoticonGrid.innerHTML = "";
  if (includeEmoticonsCheckbox.checked) {
    emoticonSet.forEach((emoticon) => {
      const btn = document.createElement("button");
      btn.className = "emoticon-btn";
      btn.textContent = emoticon;
      btn.addEventListener("click", () => {
        copyToClipboard(emoticon);
      });
      emoticonGrid.appendChild(btn);
    });
  }

  emojiStudio.style.display = includeEmojiCheckbox.checked || includeEmoticonsCheckbox.checked ? "block" : "none";
}

function applyFonts() {
  const uiFont = uiFontSelect.value;
  const resultFont = resultFontSelect.value;
  
  const fontMap = {
    poppins: '"Poppins", sans-serif',
    quicksand: '"Quicksand", sans-serif',
    dmsans: '"DM Sans", sans-serif',
    playfair: '"Playfair Display", serif',
    dancing: '"Dancing Script", cursive',
    pacifico: '"Pacifico", cursive',
    nunito: '"Nunito", sans-serif',
    montserrat: '"Montserrat", sans-serif',
    fredoka: '"Fredoka", sans-serif',
    caveat: '"Caveat", cursive',
    righteous: '"Righteous", sans-serif',
    spacemono: '"Space Mono", monospace',
    abril: '"Abril Fatface", cursive',
    indie: '"Indie Flower", cursive',
  };
  
  document.documentElement.style.setProperty("--ui-font", fontMap[uiFont] || fontMap.poppins);
  document.documentElement.style.setProperty("--result-font", fontMap[resultFont] || fontMap.poppins);
  
  localStorage.setItem("font_prefs", JSON.stringify({ uiFont, resultFont }));
}

function loadFontPrefs() {
  const prefs = JSON.parse(localStorage.getItem("font_prefs") || '{}');
  if (prefs.uiFont) uiFontSelect.value = prefs.uiFont;
  if (prefs.resultFont) resultFontSelect.value = prefs.resultFont;
}

function saveCommunityPool() {
  localStorage.setItem(COMMUNITY_KEY, JSON.stringify([...communityPool.values()]));
}

function loadCommunityPool() {
  try {
    const stored = localStorage.getItem(COMMUNITY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.forEach((item) => {
        // Backward compatibility: old pools stored plain strings.
        if (typeof item === "string") {
          const username = cleanText(item);
          if (username) {
            // Legacy entries created before ownership tracking are treated as local user's entries.
            communityPool.set(username, { username, ownerId: currentUserId });
          }
        } else if (item && typeof item.username === "string") {
          const username = cleanText(item.username);
          if (username) {
            communityPool.set(username, {
              username,
              ownerId: typeof item.ownerId === "string" ? item.ownerId : currentUserId,
            });
          }
        }
      });
    }
  } catch (e) {
    console.error("Error loading community pool:", e);
  }
}

function addToCommunity() {
  const value = communityInput.value.trim();
  if (!value || value.length < 3) return;

  const username = cleanText(value);
  if (!username) return;

  const existing = communityPool.get(username);
  if (existing && existing.ownerId !== currentUserId) {
    // Respect ownership: do not overwrite another user's entry.
    communityInput.value = "";
    return;
  }

  communityPool.set(username, { username, ownerId: currentUserId });
  saveCommunityPool();
  renderCommunityPool();
  communityInput.value = "";
}

function removeFromCommunity(username) {
  const entry = communityPool.get(username);
  if (!entry || entry.ownerId !== currentUserId) return;
  communityPool.delete(username);
  saveCommunityPool();
  renderCommunityPool();
}

function renderCommunityPool() {
  communityPoolEl.innerHTML = "";

  if (communityPool.size === 0) {
    communityPoolEl.innerHTML = '<div class="empty-state">No community usernames yet. Add your favorites!</div>';
    return;
  }

  [...communityPool.values()].forEach((entry) => {
    const username = entry.username;
    const isOwnEntry = entry.ownerId === currentUserId;

    const li = document.createElement("li");
    li.className = "community-item";

    const span = document.createElement("span");
    span.textContent = username;

    const actions = document.createElement("div");
    actions.className = "community-actions";

    const copyBtn = document.createElement("button");
    copyBtn.className = "btn-copy";
    copyBtn.textContent = "Copy";
    copyBtn.addEventListener("click", () => copyToClipboard(username));
    actions.appendChild(copyBtn);

    if (isOwnEntry) {
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "btn-delete";
      deleteBtn.textContent = "Delete";
      deleteBtn.addEventListener("click", () => removeFromCommunity(username));
      actions.appendChild(deleteBtn);
    }

    li.appendChild(span);
    li.appendChild(actions);
    communityPoolEl.appendChild(li);
  });
}

function exportCommunityPool() {
  if (communityPool.size === 0) return;

  const data = JSON.stringify([...communityPool.values()].map((entry) => entry.username), null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "insta-community-pool.json";
  a.click();
  URL.revokeObjectURL(url);
}


