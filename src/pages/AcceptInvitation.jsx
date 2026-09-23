import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import api from "@/api/axios";

const AcceptInvitation = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const accept = async () => {
    try {
      const response = await api.get(
        `/trips/${id}/invite/accept?token=${token}`
      );

      if (response.status === 200) {
        toast.success("Invitation accepted");
        navigate("/trips");
      } else {
        toast.error("Failed to accept invitation");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to accept invitation"
      );
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={accept}>Accept</Button>
    </div>
  );
};

export default AcceptInvitation;