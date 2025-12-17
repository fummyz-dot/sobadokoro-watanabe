import shop from "./content/shop.json"
import menu from "./content/menu.json"

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-8">
      {sub ? (
        <p className="text-xs tracking-[0.2em] text-stone-600">{sub}</p>
      ) : null}
      <h3 className="mt-2 text-2xl md:text-3xl font-semibold text-stone-900">
        {children}
      </h3>
      <div className="mt-4 h-px w-16 bg-stone-300" />
    </div>
  )
}

function MenuList({ items }) {
  if (!items?.length) return <p className="text-sm text-stone-600">準備中</p>
  return (
    <ul className="space-y-2 text-sm">
      {items.map((it) => (
        <li
          key={it.name}
          className="flex justify-between gap-4 border-b border-stone-300/70 pb-2"
        >
          <span className="text-stone-800">{it.name}</span>
          <span className="text-stone-700 tabular-nums">{it.price}</span>
        </li>
      ))}
    </ul>
  )
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center border border-stone-300 bg-amber-50 px-2.5 py-1 text-xs text-stone-700">
      {children}
    </span>
  )
}

export default function App() {
  const base = import.meta.env.BASE_URL || "/"
  const heroUrl = `${base}images/hero.png`

  const gallery = [
    { src: `${base}images/interior.png`, alt: "店内" },
    { src: `${base}images/exterior.png`, alt: "外観" },
    { src: `${base}images/food.png`, alt: "一品" },
  ]

  const tel = shop.tel || ""
  const telLabel = shop.telLabel || tel || "電話"

  // 予約導線（あれば使う：無ければtel）
  const reserveHref = shop.reserveUrl || (tel ? `tel:${tel}` : "#info")
  const reserveLabel = shop.reserveUrl ? "予約する" : `電話する（${telLabel}）`

  return (
    <div className="min-h-screen bg-amber-50 text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-stone-300/80 bg-amber-50/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-3">
            <h1 className="text-lg md:text-xl font-semibold tracking-wide text-stone-900">
              {shop.name || "蕎麦処 わたなべ"}
            </h1>
            <span className="hidden md:inline text-xs tracking-[0.25em] text-stone-600">
              SOBA
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-stone-700">
            <a href="#menu" className="hover:text-stone-900">お品書き</a>
            <a href="#news" className="hover:text-stone-900">お知らせ</a>
            <a href="#concept" className="hover:text-stone-900">こだわり</a>
            <a href="#info" className="hover:text-stone-900">店舗情報</a>
            <a
              href={reserveHref}
              className="ml-2 inline-flex items-center border border-stone-900 bg-stone-900 px-4 py-2 text-xs tracking-wide text-amber-50 hover:bg-stone-800"
            >
              {shop.reserveUrl ? "予約" : "電話"}
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative">
        <div
          className="h-[72vh] min-h-[520px] bg-stone-900"
          style={{
            backgroundImage: `url(${heroUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-amber-50" />

        <div className="absolute inset-x-0 top-0">
          <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-20 text-amber-50">
            <p className="text-xs tracking-[0.3em] opacity-90">SOBA · TEMPURA · SAKE</p>
            <h2 className="mt-4 text-4xl md:text-6xl font-semibold leading-tight">
              {shop.catch || "打ちたて、ゆでたて。\n香りで食べる蕎麦。"}
            </h2>

            <div className="mt-6 flex flex-wrap gap-2 text-amber-50/90">
              {shop.hours ? <Badge>営業時間：{shop.hours}</Badge> : null}
              {shop.closed ? <Badge>定休日：{shop.closed}</Badge> : null}
              {shop.access ? <Badge>{shop.access}</Badge> : null}
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={reserveHref}
                className="inline-flex items-center justify-center border border-amber-50 bg-amber-50 px-6 py-3 text-sm text-stone-900 hover:bg-amber-100"
              >
                {reserveLabel}
              </a>
              <a
                href="#menu"
                className="inline-flex items-center justify-center border border-amber-50/70 px-6 py-3 text-sm text-amber-50 hover:bg-white/10"
              >
                お品書きを見る
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6">
        {/* Menu */}
        <section id="menu" className="py-20">
          <SectionTitle sub="MENU">お品書き</SectionTitle>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="border border-stone-300/80 bg-amber-50 p-6">
              <h4 className="text-sm tracking-[0.2em] text-stone-600">昼の部</h4>
              <div className="mt-4">
                <MenuList items={menu.lunch} />
              </div>
            </div>

            <div className="border border-stone-300/80 bg-amber-50 p-6">
              <h4 className="text-sm tracking-[0.2em] text-stone-600">夜の部</h4>
              <div className="mt-4">
                <MenuList items={menu.dinner} />
              </div>
            </div>
          </div>

          <p className="mt-8 text-xs text-stone-600">
            ※ 価格は税込表記です（例）。仕入れ状況により変更する場合があります。
          </p>
        </section>

        {/* Gallery */}
        <section className="pb-20">
          <SectionTitle sub="GALLERY">店の空気</SectionTitle>

          <div className="grid md:grid-cols-3 gap-4">
            {gallery.map((g) => (
              <div key={g.src} className="border border-stone-300/80 bg-white overflow-hidden">
                <img
                  src={g.src}
                  alt={g.alt}
                  className="h-56 w-full object-cover"
                  loading="lazy"
                />
                <div className="px-4 py-3 text-xs tracking-[0.2em] text-stone-600">
                  {g.alt}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* News */}
        <section id="news" className="pb-20">
          <SectionTitle sub="NEWS">お知らせ</SectionTitle>

          <div className="border border-stone-300/80 bg-amber-50 p-6">
            {Array.isArray(shop.news) && shop.news.length ? (
              <ul className="space-y-2 text-sm text-stone-700">
                {shop.news.map((n) => (
                  <li key={n} className="leading-relaxed">・{n}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-stone-600">現在お知らせはありません。</p>
            )}
          </div>
        </section>

        {/* Concept */}
        <section id="concept" className="pb-20">
          <SectionTitle sub="CONCEPT">こだわり</SectionTitle>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="border border-stone-300/80 bg-white p-6">
              <h4 className="text-sm tracking-[0.2em] text-stone-600">蕎麦</h4>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                その日の気温・湿度に合わせて加水を調整し、香りと喉ごしを両立。
                打ちたての風味を、まずは「せいろ」で。
              </p>
            </div>
            <div className="border border-stone-300/80 bg-white p-6">
              <h4 className="text-sm tracking-[0.2em] text-stone-600">つゆ・蕎麦前</h4>
              <p className="mt-4 text-sm leading-relaxed text-stone-700">
                鰹と宗田節を主体に、蕎麦の香りを引き立てる辛口のつゆ。
                夜は蕎麦前と日本酒もご用意しています。
              </p>
            </div>
          </div>
        </section>

        {/* Info */}
        <section id="info" className="pb-24">
          <SectionTitle sub="INFO">店舗情報</SectionTitle>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="border border-stone-300/80 bg-amber-50 p-6 text-sm text-stone-700 space-y-2">
              {shop.address ? <p><span className="text-stone-900">住所：</span>{shop.address}</p> : null}
              {shop.hours ? <p><span className="text-stone-900">営業時間：</span>{shop.hours}</p> : null}
              {shop.closed ? <p><span className="text-stone-900">定休日：</span>{shop.closed}</p> : null}
              {shop.access ? <p><span className="text-stone-900">アクセス：</span>{shop.access}</p> : null}
              {tel ? (
                <p>
                  <span className="text-stone-900">電話：</span>
                  <a className="underline underline-offset-2" href={`tel:${tel}`}>{telLabel}</a>
                </p>
              ) : null}

              {Array.isArray(shop.notes) && shop.notes.length ? (
                <div className="pt-3">
                  <div className="text-xs tracking-[0.2em] text-stone-600">NOTES</div>
                  <ul className="mt-2 space-y-1 text-xs text-stone-600">
                    {shop.notes.map((x) => <li key={x}>・{x}</li>)}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="border border-stone-300/80 bg-white overflow-hidden">
              <iframe
                title="map"
                src={
                  shop.mapEmbedUrl ||
                  "https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA&output=embed"
                }
                width="100%"
                height="360"
                loading="lazy"
              />
            </div>
          </div>

          {/* photo credits (optional) */}
          {Array.isArray(shop.photoCredits) && shop.photoCredits.length ? (
            <div className="mt-10 text-xs text-stone-500">
              <div className="text-[11px] tracking-[0.2em] text-stone-500">PHOTO CREDITS</div>
              <ul className="mt-2 space-y-1">
                {shop.photoCredits.map((c) => (
                  <li key={c} className="leading-relaxed">{c}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-300/80">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-stone-600">
          {shop.footer || "© 蕎麦処 わたなべ"}
        </div>
      </footer>

      {/* Mobile fixed CTA */}
      {tel ? (
        <a
          href={`tel:${tel}`}
          className="md:hidden fixed bottom-4 left-4 right-4 z-50 text-center border border-stone-900 bg-amber-50/95 py-3 text-sm text-stone-900 backdrop-blur hover:bg-amber-100"
        >
          電話する（{telLabel}）
        </a>
      ) : null}
    </div>
  )
}

