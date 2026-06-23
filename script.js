const pools = {
  soft: {
    prefixes: ["luna", "peach", "nova", "honey", "dream", "mellow"],
    suffixes: ["bloom", "glow", "vibe", "waves", "muse", "cloud"],
  },
  edgy: {
    prefixes: ["void", "neon", "pixel", "blaze", "venom", "drift"],
    suffixes: ["zone", "core", "riot", "x", "flux", "vortex"],
  },
  clean: {
    prefixes: ["daily", "urban", "fresh", "mint", "mod", "prime"],
    suffixes: ["studio", "social", "thread", "vision", "craft", "line"],
  },
};

const MIN_LENGTH = 6;
const MAX_LENGTH = 25;
const TARGET_USERNAME_COUNT = 8;
const MAX_GENERATION_ATTEMPTS = 200;

function randomInt(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

function sample(items) {
  return items[randomInt(items.length)];
}

function sanitize(text) {
  return text.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12);
}

function clampLength(value) {
  return Math.min(MAX_LENGTH, Math.max(MIN_LENGTH, value));
}

function buildUsername(options) {
  const selectedPools =
    options.style === "all" ? Object.values(pools) : [pools[options.style]];

  const source = sample(selectedPools);
  const keyword = sanitize(options.keyword);
  const maxLength = clampLength(options.maxLength);
  const base = [sample(source.prefixes), keyword, sample(source.suffixes)].filter(Boolean);
  let username = base.join(options.separator);

  const numberChunk = `${options.separator}${100 + randomInt(900)}`;
  if (options.withNumber && username.length + numberChunk.length <= maxLength) {
    username += numberChunk;
  }

  username = username.slice(0, maxLength);
  return username.replace(/^[_\.]+|[_\.]+$/g, "");
}

function generateList() {
  const style = document.getElementById("style").value;
  const keyword = document.getElementById("keyword").value;
  const separator = document.getElementById("separator").value;
  const maxLength = Number(document.getElementById("maxLength").value) || 18;
  const withNumber = document.getElementById("withNumber").checked;
  const results = document.getElementById("results");
  const seen = new Set();

  results.innerHTML = "";
  let attempts = 0;

  while (seen.size < TARGET_USERNAME_COUNT && attempts < MAX_GENERATION_ATTEMPTS) {
    seen.add(
      buildUsername({
        style,
        keyword,
        separator,
        maxLength: clampLength(maxLength),
        withNumber,
      })
    );
    attempts += 1;
  }

  for (const name of seen) {
    const li = document.createElement("li");
    li.textContent = name;
    results.appendChild(li);
  }
}

document.getElementById("generateBtn").addEventListener("click", generateList);
generateList();
