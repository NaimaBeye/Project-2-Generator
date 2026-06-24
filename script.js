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
const communityPool = new Set();
const STORAGE_KEY = "insta_generator_favorites";
const COMMUNITY_KEY = "insta_generator_community";

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

function generateUsername() {
  const theme = themeSelect.value;
  const coreWord = cleanText(coreWordInput.value).slice(0, 12);
  const mediaRef = cleanText(mediaRefInput.value).slice(0, 12);
  const style = styleSelect.value;
  const targetLength = parseInt(lengthInput.value);
  const bank = wordbanks[theme];

  let username = "";

  if (coreWord) {
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
    // Use media reference
    const suffix = rand(bank.suffixes);
    username = `${mediaRef}${suffix}`;
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
    green: ["🟢", "💚", "🌿", "🌲", "🌳", "🍀", "🦎", "🦗"],
    blue: ["🔵", "💙", "🌊", "🫐", "🦋", "🐟", "🧿", "🪐"],
    violet: ["🟣", "💜", "🪻", "🔮", "👾", "🎀", "🪆"],
    white: ["⚪", "🤍", "🐑", "👻", "🕊️", "❄️", "💎", "🌸"],
    pink: ["🩷", "💕", "💖", "🌹", "🦩", "🐷", "🩰", "✨"],
    black: ["⚫", "🖤", "🐈‍⬛", "🐧", "🎩", "🌑", "🎪", "🖌️"],
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
  localStorage.setItem(COMMUNITY_KEY, JSON.stringify([...communityPool]));
}

function loadCommunityPool() {
  try {
    const stored = localStorage.getItem(COMMUNITY_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      parsed.forEach((item) => communityPool.add(item));
    }
  } catch (e) {
    console.error("Error loading community pool:", e);
  }
}

function addToCommunity() {
  const value = communityInput.value.trim();
  if (!value || value.length < 3) return;
  
  communityPool.add(cleanText(value));
  saveCommunityPool();
  renderCommunityPool();
  communityInput.value = "";
}

function renderCommunityPool() {
  communityPoolEl.innerHTML = "";
  
  if (communityPool.size === 0) {
    communityPoolEl.innerHTML = '<div class="empty-state">No community usernames yet. Add your favorites!</div>';
    return;
  }
  
  [...communityPool].forEach((username) => {
    const li = document.createElement("li");
    li.className = "community-item";
    
    const span = document.createElement("span");
    span.textContent = username;
    
    const btn = document.createElement("button");
    btn.className = "btn-copy";
    btn.textContent = "Copy";
    btn.addEventListener("click", () => copyToClipboard(username));
    
    li.appendChild(span);
    li.appendChild(btn);
    communityPoolEl.appendChild(li);
  });
}

function exportCommunityPool() {
  if (communityPool.size === 0) return;
  
  const data = JSON.stringify([...communityPool], null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "insta-community-pool.json";
  a.click();
  URL.revokeObjectURL(url);
}


