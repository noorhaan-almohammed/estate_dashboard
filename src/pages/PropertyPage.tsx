import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ImageSlider from "../components/ImageSlider";

export default function PropertyPage() {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const docRef = doc(db, "properties", id!);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error("Error fetching property:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!property)
    return <p className="text-center text-red-600 mt-8">Property not found.</p>;

  return (
    <div className="max-w-[90%] mx-auto p-6 space-y-8">
      <div>
        <Link to="/propertiesdashboard" className="font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-[#703BF7] text-white hover:bg-[#5e2bd6] ">
        Back to list
      </Link>
      </div>

      <div>
        {property.imageUrls?.length > 0 && (
          <ImageSlider images={property.imageUrls} />
        )}

        <h1 className="text-3xl font-bold">{property.name}</h1>
        <p className="text-gray-600">{property.location}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem label="Type" value={property.type} />
        <InfoItem label="Price" value={property.price} isCurrency />
        <InfoItem label="Listing Price" value={property.listing_price} isCurrency />
        <InfoItem label="Bedrooms" value={property.bedrooms} />
        <InfoItem label="Bathrooms" value={property.bathrooms} />
        <InfoItem label="Area" value={property.area} unit="m²" />
        <InfoItem label="Build Year" value={property.build_year} />
        <InfoItem
          label="Created At"
          value={
            property.createdAt?.seconds
              ? new Date(property.createdAt.seconds * 1000).toLocaleString()
              : "-"
          }
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>

      {property.features?.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Features</h2>
          <ul className="list-disc list-inside text-gray-700">
            {property.features.map((feature: string, idx: number) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-2">Financial Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
          <InfoItem
            label="Down Payment"
            value={property.down_payment}
            isCurrency
          />
          <InfoItem
            label="Mortgage Amount"
            value={property.mortgage_amount}
            isCurrency
          />
          <InfoItem
            label="Mortgage Fees"
            value={property.mortgage_fees}
            isCurrency
          />
          <InfoItem
            label="Expense Mortgage"
            value={property.expense_mortgage}
          />
          <InfoItem
            label="Monthly Taxes"
            value={property.monthly_taxes}
            isCurrency
          />
          <InfoItem
            label="Expense Taxes"
            value={property.expense_taxes}
            isCurrency
          />
          <InfoItem
            label="Expense Insurance"
            value={property.expense_insurance}
            isCurrency
          />
          <InfoItem label="Legal Fees" value={property.legal_fees} isCurrency />
          <InfoItem
            label="Transfer Tax"
            value={property.transfer_tax}
            isCurrency
          />
          <InfoItem label="Inspection" value={property.inspection} isCurrency />
          <InfoItem label="Insurance" value={property.insurance} isCurrency />
          <InfoItem label="HOA Fee" value={property.hoa_fee} isCurrency />
          <InfoItem
            label="Total Additional Fees"
            value={property.total_additional_fees}
            isCurrency
          />
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  isCurrency = false,
  unit = "",
}: {
  label: string;
  value: string | number | undefined;
  isCurrency?: boolean;
  unit?: string;
}) {
  const displayValue =
    value === undefined || value === null || value === ""
      ? "-"
      : isCurrency
      ? `$${value}`
      : unit
      ? `${value} ${unit}`
      : value;

  return (
    <div className="flex justify-between border-b pb-1">
      <span className="font-medium text-gray-800">{label}</span>
      <span>{displayValue}</span>
    </div>
  );
}
