// ===== DATA: ganti dengan keluargamu =====
// Satu node = satu pasangan (atau satu orang). "a" dan "b" adalah pasangan; "anak" berisi keturunannya.
const KELUARGA = {
  a: { n: "ちち", foto: "foto/ayah.jpg", r: "chichi", s: "りょうしん", rs: "ryōshin" }, b: { n: "はは", foto: "foto/ibu.jpg", r: "haha", s: "りょうしん", rs: "ryōshin" },
  anak: [
    { a: { n: "あに", foto: "foto/kakak1.jpg", r: "ani", s: "第一子", rs: "daiichi-shi" } },
    { a: { n: "あに", foto: "foto/kakak2.jpg", r: "ani", s: "第二子", rs: "daini-shi" } },
    { a: { n: "わたし", foto: "foto/saya.jpg", r: "watashi", s: "第三子", rs: "daisan-shi", me: true } }
  ]
};
// Tambah foto: { n: "Ayah", foto: "https://..." }
// =========================================
const orang = (p) => {
  const d = document.createElement("div"); d.className = "person" + (p.me ? " me" : "");
  const av = document.createElement("div"); av.className = "av";
  if (p.foto) { const im = document.createElement("img"); im.src = p.foto; im.alt = p.n; av.append(im); }
  else av.textContent = p.n.charAt(0).toUpperCase();
  const b = document.createElement("b"); b.textContent = p.n;
  const s = document.createElement("small"); s.textContent = p.s || "";
  const r = document.createElement("i"); r.className = "rj"; r.textContent = p.r || "";
  const rs = document.createElement("i"); rs.className = "rj"; rs.textContent = p.rs || "";
  d.append(av, b, r, s, rs); return d;
};
const buat = (node, g) => {
  const li = document.createElement("li"); li.setAttribute("role", "treeitem"); li.style.setProperty("--g", g);
  const c = document.createElement("div"); c.className = "couple"; c.style.setProperty("--g", g);
  c.append(orang(node.a));
  if (node.b) { const j = document.createElement("span"); j.className = "join"; c.append(j, orang(node.b)); }
  li.append(c);
  if (node.anak && node.anak.length) {
    const ul = document.createElement("ul"); ul.setAttribute("role", "group");
    node.anak.forEach(k => ul.append(buat(k, g + 1))); li.append(ul);
  }
  return li;
};
const root = document.createElement("ul"); root.append(buat(KELUARGA, 0));
document.getElementById("tree").append(root);



// ===== Kalimat perkenalan: j = Jepang (dengan furigana), r = romaji, id = arti =====
const R = (k, f) => `<ruby>${k}<rt>${f}</rt></ruby>`;
const KALIMAT = [
  { j: `これは${R("私","わたし")}の${R("家族","かぞく")}。`, r: "Kore wa watashi no kazoku", id: "Ini keluargaku." },
  { j: `${R("私","わたし")}の${R("家族","かぞく")}は${R("五人","ごにん")}です。`, r: "Watashi no kazoku wa gonin desu", id: "Keluargaku ada lima orang." },
  { j: `${R("私","わたし")}と${R("父","ちち")}と${R("母","はは")}と${R("兄","あに")}です。`, r: "Watashi to chichi to haha to ani desu", id: "Aku, ayah, ibu, dan kakak." },
  { j: `${R("私","わたし")}は${R("三人","さんにん")}${R("兄弟","きょうだい")}です。`, r: "Watashi wa san nin kyoudai desu", id: "Aku tiga bersaudara." },
  { j: `${R("兄","あに")}${R("二人","ふたり")}です。`, r: "Ani futari desu", id: "Kakakku dua orang." },
  { j: `${R("私","わたし")}は${R("三番目","さんばんめ")}です。`, r: "Watashi wa san ban me desu", id: "Aku anak ketiga." },
  { j: `${R("私","わたし")}は${R("一番下","いちばんした")}です。`, r: "Watashi wa ichi ban shita desu", id: "Aku yang paling bungsu." }
];
document.getElementById("ks").innerHTML = KALIMAT.map((k, i) =>
  `<li style="--i:${i}"><div><div class="jp">${k.j}</div><span class="rj">${k.r}</span><span class="id">${k.id}</span></div></li>`).join("");

// Foto di opening diambil dari data KELUARGA (ayah, ibu, kakak, kakak, saya)
const semua = (n, a = []) => { a.push(n.a); if (n.b) a.push(n.b); (n.anak || []).forEach((k) => semua(k, a)); return a; };
const putar = [-6, 4, -3, 5, -4];
semua(KELUARGA).forEach((p, i) => {
  const d = document.createElement("div"); d.className = "pol" + (p.me ? " me" : "");
  d.style.cssText = `--n:${i};--r:${putar[i % putar.length]}deg`;
  const f = document.createElement("i");
  if (p.foto) { const im = document.createElement("img"); im.src = p.foto; im.alt = ""; f.append(im); }
  else f.textContent = p.n.charAt(0);
  d.append(f); document.getElementById("pols").append(d);
});
// Kelopak sakura: setengah di belakang foto, setengah di depan
const cover = document.querySelector(".cover");
for (let i = 0; i < 24; i++) {
  const e = document.createElement("i"); e.className = "petal " + (i % 2 ? "bk" : "fr");
  e.style.cssText = `--l:${Math.random()*100}%;--s:${10+(i%2?0:6)+Math.random()*12}px;--t:${5+Math.random()*4}s;--w:${Math.random()*3.5}s;--x:${(Math.random()-.5)*140}px`;
  cover.prepend(e);
}

// Opening terpisah: halaman judul langsung tampil. Bagan muncul setelah tombol ditekan.
const intro = document.getElementById("intro");
const body = document.body;
const siap = () => intro.classList.add("ready");
const masuk = () => {
  intro.classList.add("done");
  body.classList.remove("lock");
  body.classList.add("go");
  scrollTo(0, 0);
};
const kembali = () => {
  body.classList.remove("go");
  body.classList.add("lock");
  intro.classList.remove("done");
  intro.classList.remove("ready");
  setTimeout(siap, 1000);
};
document.getElementById("masuk").addEventListener("click", masuk);
document.getElementById("kembali").addEventListener("click", kembali);
setTimeout(siap, 200);
