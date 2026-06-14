import { Button } from "@/components";

type PaginationProps = {
  page: number;
  maxPages: number;
  onClick: (page: number) => void;
};

export const Pagination = ({ page, maxPages, onClick }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center gap-6">
      <Button disabled={page === 1} onClick={() => onClick(Math.max(page - 1, 1))}>
        Prev
      </Button>
      <p className="font-medium text-gray-300">
        {page} / {maxPages}
      </p>
      <Button disabled={page === maxPages} onClick={() => onClick(Math.min(page + 1, maxPages))}>
        Next
      </Button>
    </div>
  );
};
