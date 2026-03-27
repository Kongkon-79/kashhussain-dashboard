import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import moment from "moment";
import { ManageUser } from "./manage-users-data-type";

const ManageUserView = ({
  open,
  onOpenChange,
  manageUser,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manageUser: ManageUser | null;
}) => {
  if (!manageUser) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-6 bg-white !rounded-[12px]">
        
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-semibold text-primary leading-normal">
            Users Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-5">
          
          {/* Name */}
          <div>
            <p className="text-lg md:text-xl leading-normal font-semibold text-[#343A40]">Name :</p>
            <p className="text-base font-medium text-[#343A40] leading-normal">{manageUser.fullName}</p>
          </div>

          {/* Email */}
          <div>
            <p className="text-lg md:text-xl leading-normal font-semibold text-[#343A40]">Email :</p>
            <p className="text-base font-medium text-[#343A40] leading-normal">{manageUser.email}</p>
          </div>

          {/* Phone */}
          <div>
            <p className="text-lg md:text-xl leading-normal font-semibold text-[#343A40]">Phone Number :</p>
            <p className="text-base font-medium text-[#343A40] leading-normal">{manageUser.phoneNumber}</p>
          </div>

          {/* Date */}
          <div>
            <p className="text-lg md:text-xl leading-normal font-semibold text-[#343A40]">Date :</p>
            <p className="text-base font-medium text-[#343A40] leading-normal">
              {moment(manageUser.createdAt).format("MMM DD, YYYY")}
            </p>
          </div>

        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ManageUserView;