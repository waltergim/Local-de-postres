import Image from "next/image";
import { formatPrice, productWhatsAppLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/products";
import { SparkleIcon, WhatsAppIcon } from "@/components/icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition hover:border-ink/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-faint">
            <SparkleIcon className="h-10 w-10" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex-1">
          <h3 className="font-display text-xl leading-tight text-ink">
            {product.name}
          </h3>
          {product.description ? (
            <p className="mt-1 text-sm text-muted">{product.description}</p>
          ) : null}
        </div>

        <span className="font-display text-2xl text-ink">
          {formatPrice(product.price)}
        </span>

        <a
          href={productWhatsAppLink(product)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-ink px-5 py-3 text-base font-medium text-ink transition hover:bg-ink hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          <WhatsAppIcon className="h-4 w-4" />
          Pedir por WhatsApp
        </a>
      </div>
    </article>
  );
}
