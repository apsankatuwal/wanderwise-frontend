import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { SquarePen, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";

const BaggageDetails = () => {
  const { id } = useParams();

  const [baggages, setBaggages] = useState([]);
  const [dependancy, setDependency] = useState(0);
  const [editingBaggage, setEditingBaggage] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    const fetchBaggages = async () => {
      try {
        const response = await api.get(`/${id}/baggages`);
        setBaggages(response.data);
      } catch (error) {
        toast.error(error.message || "Error while fetching baggages");
      }
    };

    fetchBaggages();
  }, [id, dependancy]);

  const addBaggage = async () => {
    const name = document.getElementById("baggageInput");
    try {
      const response = await api.post(`/${id}/baggages`, { name: name.value });

      if (response.status === 201) {
        toast.success("Baggage added successfully");
        name.value = "";
        setDependency(dependancy + 1);
      } else {
        toast.error("Error while adding baggage");
      }
    } catch (error) {
      toast.error(error.message || "Error while adding baggage");
      console.log(error);
    }
  };

  const onDelete = async (baggageId) => {
    try {
      const response = await api.delete(`/${id}/baggages/${baggageId}`);

      if (response.status === 200) {
        toast.success("Baggage deleted successfully!!");
        setDependency(dependancy + 1);
      } else {
        toast.error("Error while deleting baggage.");
      }
    } catch (error) {
      toast.error(error.message || "Error while deleting baggage");
      console.log(error);
    }
  };

  const onCheck = async (baggageId, completed) => {
    try {
      const response = await api.patch(`/${id}/baggages/${baggageId}`, {
        completed,
      });

      if (response.status === 200) {
        setDependency(dependancy + 1);
      } else {
        toast.error("Error while updating baggage.");
      }
    } catch (error) {
      toast.error(error.message || "Error while updating baggage");
      console.log(error);
    }
  };

  const onEdit = async () => {
    try {
      const response = await api.patch(
        `/${id}/baggages/${editingBaggage._id}`,
        { name: editValue }
      );

      if (response.status === 200) {
        toast.success("Baggage updated successfully");
        setEditingBaggage(null);
        setDependency(dependancy + 1);
      } else {
        toast.error("Error while updating baggage.");
      }
    } catch (error) {
      toast.error(error.message || "Error while updating baggage");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 px-6 py-16 sm:px-10 lg:px-20">
      <Card className="rounded-2xl border-none shadow-sm ring-1 ring-slate-100">
        <CardHeader className="border-b border-slate-100">
          <CardTitle className="text-xl font-semibold tracking-tight text-slate-900">
            See Baggages for this trip
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            View and manage baggages.
          </CardDescription>
          <CardAction>
            <Dialog>
              <DialogTrigger
                render={
                  <Button className="bg-sky-700 text-white hover:bg-sky-800" />
                }
              >
                Add Baggage
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Baggage</DialogTitle>
                  <DialogDescription>
                    Provide the name of item you want to pack for this trip.
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <Label htmlFor="baggageInput" className="mb-2">
                    Name of item
                  </Label>
                  <Input
                    type="text"
                    placeholder="medicine"
                    id="baggageInput"
                    className="border-slate-200 focus-visible:ring-sky-200"
                  />
                </div>

                <Button
                  onClick={addBaggage}
                  className="w-full bg-sky-700 text-white hover:bg-sky-800"
                >
                  Submit
                </Button>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {baggages.length === 0 ? (
              <p className="col-span-full text-sm text-slate-500">
                No baggages found for this trip. Please add some baggages.
              </p>
            ) : (
              baggages.map((baggage) => (
                <div
                  key={baggage._id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={baggage.completed}
                      onCheckedChange={(checked) =>
                        onCheck(baggage._id, checked)
                      }
                    />
                    <p
                      className={`text-sm font-medium ${
                        baggage.completed
                          ? "text-slate-400 line-through"
                          : "text-slate-700"
                      }`}
                    >
                      {baggage.name}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setEditingBaggage(baggage);
                        setEditValue(baggage.name);
                      }}
                      className="text-slate-500 hover:bg-sky-50 hover:text-sky-700"
                    >
                      <SquarePen className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(baggage._id)}
                      className="text-slate-500 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Total Baggages:{" "}
            <span className="font-semibold text-slate-900">
              {baggages.length}
            </span>
          </p>
        </CardFooter>
      </Card>

      <Dialog
        open={!!editingBaggage}
        onOpenChange={(open) => !open && setEditingBaggage(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Baggage</DialogTitle>
            <DialogDescription>
              Update the name of this item.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Label htmlFor="editBaggageInput" className="mb-2">
              Name of item
            </Label>
            <Input
              type="text"
              id="editBaggageInput"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="border-slate-200 focus-visible:ring-sky-200"
            />
          </div>

          <Button
            onClick={onEdit}
            className="w-full bg-sky-700 text-white hover:bg-sky-800"
          >
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BaggageDetails;