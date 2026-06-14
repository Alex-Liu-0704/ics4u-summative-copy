import type { ImageAction, ImageCell } from "@/core";

type ImageOverlayProps = {
  image: ImageCell;
  actions: ImageAction[];
};

export const ImageOverlay = ({ image, actions }: ImageOverlayProps) => {
  return (
    <>
      {actions.map((action) => {
        const isActive = action.active(image);

        return (
          <button
            className={[
              "absolute top-1 z-10 rounded-full bg-black/50 p-2 backdrop-blur-sm transition hover:bg-black/70",
              action.position === "left" ? "left-1" : "right-1",
            ].join(" ")}
            key={action.id}
            onClick={(event) => {
              event.stopPropagation();
              action.onClick(image);
            }}
          >
            {action.icon(isActive)}
          </button>
        );
      })}
    </>
  );
};
