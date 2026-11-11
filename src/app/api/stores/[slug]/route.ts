import { NextResponse } from "next/server";
import { storeService } from "@/modules/stores/store.service";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const store = await storeService.getPublicBySlug(slug);

  if (!store || !store.published) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json({
    id: store.id,
    name: store.name,
    slug: store.slug,
    theme: store.theme,
    primaryColor: store.primaryColor,
    published: store.published,
  });
}
