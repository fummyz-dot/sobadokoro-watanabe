import shop from "./content/shop.json"
import menu from "./content/menu.json"

function MenuList({ items }) {
  return (
    <ul className="space-y-2 text-sm">
      {items.map((it) => (
        <li key={it.name} className="flex justify-between border-b border-stone-300 pb-1">
          <span>{it.name}</span>
          <span>{it.price}</span>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  return (
    <div className="bg-amber-50 text-stone-800">
      <header className="border-b border-stone-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold tracking-wide">{shop.name}</h1>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#menu" className="hover:text-stone-600">お品書き</a>
            <a href="#concept" className="hover:text-stone-600">こだわり</a>
            <a href="#info" className="hover:text-stone-600">店舗情報</a>
          </nav>
        </div>
      </header>

      <section
        className="relative h-[70vh] flex items-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1604908177225-0c3c7e0c9dcd?auto=format&fit=crop&w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-6xl mx-auto px-6 text-white">
          <p className="text-sm tracking-widest mb-3">SOBA · TEMPURA · SAKE</p>
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            {shop.catch.split("。").map((s, i) => (
              s ? <span key={i}>{s}。<br /></span> : null
            ))}
          </h2>
          <a
            href={`tel:${shop.tel}`}
            className="inline-block border border-white px-6 py-3 text-sm hover:bg-white hover:text-stone-800 transition"
          >
            ご予約・お問い合わせ（{shop.telLabel}）
          </a>
        </div>
      </section>

      <section id="menu" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-semibold mb-10">お品書き</h3>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="font-medium mb-4">昼の部</h4>
            <MenuList items={menu.lunch} />
          </div>

          <div>
            <h4 className="font-medium mb-4">夜の部</h4>
            <MenuList items={menu.dinner} />
          </div>
        </div>
      </section>

      <section id="concept" className="bg-stone-100 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-semibold mb-6">こだわり</h3>
          <p className="text-sm leading-relaxed text-stone-700">
            毎朝石臼で挽いた蕎麦粉を使い、その日の気温と湿度に合わせて加水を調整。<br /><br />
            つゆは鰹と宗田節を主体に、蕎麦の香りを引き立てる辛口に仕上げています。
          </p>
        </div>
      </section>

      <section id="info" className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-2xl font-semibold mb-8">店舗情報</h3>
        <div className="text-sm space-y-2">
          <p>住所：{shop.address}</p>
          <p>営業時間：{shop.hours}</p>
          <p>定休日：{shop.closed}</p>
          <p>アクセス：{shop.access}</p>
        </div>
      </section>

      <footer className="border-t border-stone-300 py-6 text-center text-xs text-stone-600">
        {shop.footer}
      </footer>
    </div>
  )
}

