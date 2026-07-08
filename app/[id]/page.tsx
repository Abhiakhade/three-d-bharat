import { deals } from "@/src/data/deals";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default function DealDetailsPage({ params }: PageProps) {
  const deal = deals.find((d) => d.id === Number(params.id));

  if (!deal) {
    notFound();
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">{deal.companyName}</h1>

      <p>{deal.description}</p>

      <p>Industry: {deal.industry}</p>

      <p>ROI: {deal.roi}%</p>

      <p>Risk: {deal.risk}</p>
    </div>
  );
}
