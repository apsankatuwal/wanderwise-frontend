import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { SquarePen, Trash2 } from "lucide-react";

const BaggageDetails = () => {
  const { id } = useParams();

  const [baggages, setBaggages] = useState([]);
  const [dependancy, setDependency] = useState(0);

  useEffect(() => {
    const fetchBaggages = async () => {
      try {
        const response = await api.get(`/${id}/baggages`);
        setBaggages(response.data);
      } catch (error) {
        toast.error(error.message || "Error while fetching trips");
      }
    };

    fetchBaggages();
  }, [dependancy]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Baggage Details</CardTitle>
          <CardDescription>View and manage baggages.</CardDescription>
          <CardAction>
            <Button className={'bg-sky-700 text-white hover:bg-sky-800'}>Add Baggage</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded p-4 flex items-center justify-between">
              <div>
                <Checkbox />
                <p>Medicine</p>
              </div>
              <div>
                <Button variant="outline" size="icon">
                  <SquarePen />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>Total Baggages: {baggages.length}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BaggageDetails;
