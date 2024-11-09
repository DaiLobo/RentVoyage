import { useTranslation } from "next-i18next";
import React, { Dispatch, SetStateAction } from "react";

import { Button } from "./ui/button";
import {
  Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle
} from "./ui/dialog";
import { Slider } from "./ui/slider";

interface FilterModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  priceRange: number[]
  setPriceRange: Dispatch<SetStateAction<number[]>>;
}

export const FilterModal: React.FC<FilterModalProps> = ({ isOpen, setIsOpen, priceRange, setPriceRange }) => {
  const { t } = useTranslation("stays");

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("filter-price")}</DialogTitle>
        </DialogHeader>

        <div className="bg-white p-4 rounded">
          <div className="flex items-center mb-8 gap-4">
            <div className="border-2 border-slate-500 rounded-md p-2 w-1/2">
              <p className="text-sm font-bold">Min.</p>
              <p className="text-gray-600 line-clamp-2">
                R${priceRange[0].toFixed(2)}
              </p>
            </div>
            <div className="border-2 border-slate-500 rounded-md p-2 w-1/2">
              <p className="text-sm font-bold">Max.</p>
              <p className="text-gray-600 line-clamp-2">
                R${`${priceRange[1].toFixed(2)} ${priceRange[1] === 1000 ? " +" : ""}`}
              </p>
            </div>
          </div>

          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value)}
            min={0}
            max={1000}
            step={10}
          />
        </div>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="text-white">
              {t("close")}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}