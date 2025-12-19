import { useMemo, useState } from "react"
import shop from "./content/shop.json"
import menu from "./content/menu.json"

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-8">
      {sub ? <p className="text-xs tracking-[0.22em] text-stone-600">{sub}</p> : null}
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

function NavItem({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full text-left px-3 py-2 text-sm transition",
        active
          ? "bg-stone-900 text-amber-50"
          : "text-stone-700 hover:bg-white/60 hover:text-stone-900",
        "border border-transparent",
      ].join(" ")}
    >
      {children}
    </button>
  )
}

function SideNav({ page, setPage, reserveHref, telLabel }) {
  return (
    <aside className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-50 w-60">
      <div className="rich-paper p-5">
        <div className="mt-2 text-sm font-semibold text-stone-900">{shop.name || "蕎麦処 わたなべ"}</div>

        <div className="mt-5 space-y-2">
          <NavItem active={page === "news"} onClick={() => setPage("news")}>お知らせ</NavItem>
          <NavItem active={page === "concept"} onClick={() => setPage("concept")}>
            蕎麦処 わたなべのこだわり
          </NavItem>
          <NavItem active={page === "menu"} onClick={() => setPage("menu")}>メニュー</NavItem>
          <NavItem active={page === "contact"} onClick={() => setPage("contact")}>お問い合わせ</NavItem>
        </div>

        <div className="mt-5 grid gap-2">
          <a
            href={reserveHref}
            className="rich-primary inline-flex items-center justify-center px-4 py-2 text-xs tracking-wide"
          >
            {shop.reserveUrl ? "予約する" : "電話する"}
          </a>
          <button
            type="button"
            onClick={() => setPage("contact")}
            className="rich-ghost inline-flex items-center justify-center px-4 py-2 text-xs tracking-wide text-stone-800"
          >
            {telLabel ? `電話：${telLabel}` : "店舗情報"}
          </button>
        </div>
      </div>
    </aside>
  )
}

/** ページ切替時の“さりげない高級感” */
function PageShell({ children }) {
  return (
    <div className="animate-[fadeIn_.28s_ease-out]">
      {children}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/** メイン：初期は写真だけ（exterior.pngのみ） */
function HomeHero({ heroUrl }) {
  return (
    <div className="rich-frame overflow-hidden">
      <div
        className="h-[78vh] min-h-[620px] hero-mist"
        style={{
          backgroundImage: `url(${heroUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  )
}

function NewsPage({ base }) {
  return (
    <PageShell>
      <SectionTitle sub="NEWS">お知らせ</SectionTitle>
       <div className="mb-10 rich-frame overflow-hidden">
        <img
          src={`${base}images/interior.png`}
          alt="店内"
          className="w-full h-[220px] md:h-[280px] object-cover"
          loading="lazy"
        />
        <div className="px-4 py-3 text-xs tracking-[0.2em] text-stone-600 bg-white/60">
          店内
        </div>
      </div>
      <div className="rich-paper p-7">
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
    </PageShell>
  )
}

function ConceptPage({ base }) {
  return (
    <PageShell>
      <SectionTitle sub="CONCEPT">蕎麦処 わたなべのこだわり</SectionTitle>
 		<div className="mb-10 rich-frame overflow-hidden">
        <img
          src={`${base}images/soba.jpg`}
          alt="かけ蕎麦"
          className="w-full h-[360px] object-cover [object-position:50%_68%]"
          loading="lazy"
        />
        <div className="px-4 py-3 text-xs tracking-[0.2em] text-stone-600 bg-white/60">
          かけ蕎麦
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="rich-paper p-7">
          <h4 className="text-sm tracking-[0.2em] text-stone-600">蕎麦</h4>
          <p className="mt-4 text-sm leading-relaxed text-stone-700">
            その日の気温・湿度に合わせて加水を調整し、香りと喉ごしを両立。
            打ちたての風味を、まずは「せいろ」で。
          </p>
        </div>

        <div className="rich-paper p-7">
          <h4 className="text-sm tracking-[0.2em] text-stone-600">つゆ・蕎麦前</h4>
          <p className="mt-4 text-sm leading-relaxed text-stone-700">
            鰹と宗田節を主体に、蕎麦の香りを引き立てる辛口のつゆ。
            夜は蕎麦前と日本酒もご用意しています。
          </p>
        </div>
      </div>
    </PageShell>
  )
}

function MenuPage({ base }) {
  const foodUrl = `${base}images/food.png`
  const kamoUrl = `${base}images/kamonan.jpg` 

  return (
    <PageShell>
      <SectionTitle sub="MENU">メニュー</SectionTitle>
   {/* 写真を横に2枚（スマホは縦） */}
      <div className="mb-10 grid gap-4 md:grid-cols-2">
        <div className="rich-frame overflow-hidden">
          <img
            src={foodUrl}
            alt="天ぷら蕎麦"
            className="w-[400px] h-[460px] object-cover"
            loading="lazy"
          />
          <div className="px-4 py-3 text-xs tracking-[0.2em] text-stone-600 bg-white/60">
            天ぷら蕎麦
          </div>
        </div>

        <div className="rich-frame overflow-hidden">
          <img
            src={kamoUrl}
            alt="鴨南蛮"
            className="w-[400px] h-[460px] object-cover"
            loading="lazy"
          />
          <div className="px-4 py-3 text-xs tracking-[0.2em] text-stone-600 bg-white/60">
            鴨南蛮
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="rich-paper p-7">
          <h4 className="text-sm tracking-[0.2em] text-stone-600">昼の部</h4>
          <div className="mt-5">
            <MenuList items={menu.lunch} />
          </div>
        </div>

        <div className="rich-paper p-7">
          <h4 className="text-sm tracking-[0.2em] text-stone-600">夜の部</h4>
          <div className="mt-5">
            <MenuList items={menu.dinner} />
          </div>
        </div>
      </div>

      <p className="mt-8 text-xs text-stone-600">
        ※ 価格は税込表記です（例）。仕入れ状況により変更する場合があります。
      </p>
    </PageShell>
  )
}

function ContactPage({ tel, telLabel, googleMapUrl }) {
  return (
    <PageShell>
      <SectionTitle sub="CONTACT">お問い合わせ</SectionTitle>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rich-paper p-7 text-sm text-stone-700 space-y-2">
          {shop.address ? <p><span className="text-stone-900">住所：</span>{shop.address}</p> : null}
          {shop.hours ? <p><span className="text-stone-900">営業時間：</span>{shop.hours}</p> : null}
          {shop.closed ? <p><span className="text-stone-900">定休日：</span>{shop.closed}</p> : null}
          {shop.access ? <p><span className="text-stone-900">アクセス：</span>{shop.access}</p> : null}

          {telLabel ? (
            <p>
              <span className="text-stone-900">電話：</span>
              <a className="underline underline-offset-2" href={`tel:${tel}`}>{telLabel}</a>
            </p>
          ) : null}

          {Array.isArray(shop.notes) && shop.notes.length ? (
            <div className="pt-4">
              <div className="text-xs tracking-[0.2em] text-stone-600">NOTES</div>
              <ul className="mt-2 space-y-1 text-xs text-stone-600">
                {shop.notes.map((x) => <li key={x}>・{x}</li>)}
              </ul>
            </div>
          ) : null}

          <div className="pt-4 flex flex-wrap gap-2">
            {googleMapUrl ? (
              <a
                href={googleMapUrl}
                target="_blank"
                rel="noreferrer"
                className="rich-ghost inline-flex items-center justify-center px-4 py-2 text-xs text-stone-800"
              >
                Googleマップで開く
              </a>
            ) : null}
            {tel ? (
              <a
                href={`tel:${tel}`}
                className="rich-primary inline-flex items-center justify-center px-4 py-2 text-xs"
              >
                電話する
              </a>
            ) : null}
          </div>
        </div>

        <div className="rich-paper overflow-hidden">
          <iframe
            title="map"
            src={
              shop.mapEmbedUrl ||
              "https://www.google.com/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%8D%83%E4%BB%A3%E7%94%B0%E5%8C%BA&output=embed"
            }
            width="100%"
            height="420"
            loading="lazy"
          />
        </div>
      </div>
    </PageShell>
  )
}

export default function App() {
  const base = import.meta.env.BASE_URL || "/"

  // 初期メイン：exterior.pngのみ（テキスト無し）
  const heroUrl = `${base}images/exterior.png`

  // ナビクリックで切り替わるページ状態
  const [page, setPage] = useState("home")

  const tel = shop.tel || ""
  const telLabel = shop.telLabel || tel || ""

  const reserveHref = shop.reserveUrl || (tel ? `tel:${tel}` : "#")
  const googleMapUrl =
    shop.googleMapUrl ||
    (shop.mapEmbedUrl ? shop.mapEmbedUrl.replace("&output=embed", "") : "")

  // モバイル用：下部バー（SPA切替）
  const MobileBar = () => (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-stone-300 bg-amber-50/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={() => setPage("news")}
          className="text-center border border-stone-300 bg-white py-2 text-xs text-stone-800"
        >
          お知らせ
        </button>
        <button
          type="button"
          onClick={() => setPage("concept")}
          className="text-center border border-stone-300 bg-white py-2 text-xs text-stone-800"
        >
          こだわり
        </button>
        <button
          type="button"
          onClick={() => setPage("menu")}
          className="text-center border border-stone-300 bg-white py-2 text-xs text-stone-800"
        >
          メニュー
        </button>
        <button
          type="button"
          onClick={() => setPage("contact")}
          className="text-center border border-stone-900 bg-stone-900 py-2 text-xs text-amber-50"
        >
          問合せ
        </button>
      </div>
    </div>
  )

  // Header（モバイル上部：店名だけ）
  const MobileHeader = () => (
    <header className="lg:hidden sticky top-0 z-40 border-b border-stone-300/80 bg-amber-50/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPage("home")}
          className="text-sm font-semibold tracking-wide text-stone-900"
        >
          {shop.name || "蕎麦処 わたなべ"}
        </button>
        {tel ? (
          <a
            href={`tel:${tel}`}
            className="inline-flex items-center border border-stone-900 bg-stone-900 px-4 py-2 text-xs tracking-wide text-amber-50 hover:bg-stone-800"
          >
            電話
          </a>
        ) : null}
      </div>
    </header>
  )

  return (
    <div className="min-h-screen text-stone-800">
      <SideNav
        page={page}
        setPage={setPage}
        reserveHref={reserveHref}
        telLabel={telLabel}
      />

      <MobileHeader />

      {/* メイン領域：左ナビ分の余白を確保 */}
      <main className="mx-auto max-w-6xl px-6 lg:pl-64 pt-8 pb-24 lg:pb-12">
        {page === "home" ? (
          <HomeHero heroUrl={heroUrl} />
        ) : null}

        {page === "news" ? <NewsPage base={base} /> : null}
        {page === "concept" ? <ConceptPage base={base} /> : null}
        {page === "menu" ? <MenuPage base={base} /> : null}
        {page === "contact" ? (
          <ContactPage tel={tel} telLabel={telLabel} googleMapUrl={googleMapUrl} />
        ) : null}

        {/* home 以外の時だけ「戻る」を置く（上品に） */}
        {page !== "home" ? (
          <div className="mt-10">
            <button
              type="button"
              onClick={() => setPage("home")}
              className="rich-ghost inline-flex items-center justify-center px-5 py-3 text-sm text-stone-800"
            >
              外観写真に戻る
            </button>
          </div>
        ) : null}

        {/* homeの時は余計な情報ゼロ、ただ写真のみ */}
      </main>

      <footer className="border-t border-stone-300/80 pb-20 lg:pb-0">
        <div className="mx-auto max-w-6xl px-6 py-8 text-center text-xs text-stone-600 lg:pl-64">
          {shop.footer || "© 蕎麦処 わたなべ"}
        </div>
      </footer>

      <MobileBar />
    </div>
  )
}
