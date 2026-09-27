import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { socials, videos, type Video } from "@/lib/data";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { YouTubeIcon } from "@/components/icons";

/** Thumbnail card that opens the video on YouTube in a new tab. */
function VideoCard({ video }: { video: Video }) {
  return (
    <a
      href={`https://www.youtube.com/watch?v=${video.id}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on YouTube: ${video.title} (opens in a new tab)`}
      className="group block overflow-hidden rounded-2xl border bg-card/70 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-red-500/40 hover:shadow-xl hover:shadow-red-500/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <span className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white">
          <Play className="ml-0.5 size-6 fill-current" />
        </span>
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-[11px] font-medium text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
          YouTube <ArrowUpRight className="size-3" />
        </span>
      </div>
      <p className="line-clamp-2 p-4 text-sm font-medium">{video.title}</p>
    </a>
  );
}

export function Videos() {
  return (
    <section id="vlogs" aria-labelledby="vlogs-title" className="scroll-mt-8">
      <SectionHeading
        id="vlogs-title"
        eyebrow="Beyond code"
        title="On the road with"
        highlight="Airborne Traveller"
        description="When I'm not shipping UI, I'm filming travel vlogs and honest tech reviews."
      />

      <Stagger className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
        {videos.map((v) => (
          <StaggerItem key={v.id} className="w-[82%] shrink-0 snap-center sm:w-auto">
            <VideoCard video={v} />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-8 flex justify-center">
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <a href={socials.youtube} target="_blank" rel="noopener noreferrer">
            <YouTubeIcon className="size-4 text-red-600" /> Visit the channel
          </a>
        </Button>
      </Reveal>
    </section>
  );
}
