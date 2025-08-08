import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ImageSlider from "../components/ImageSlider";
import InfoItem from "../components/InfoItem";

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
    <div className="w-full px-4 py-8 xl:px-8 space-y-15 bg-bg">
      <div>
        <Link
          to="/properties-dashboard"
          className="font-semibold cursor-pointer px-4 py-2 rounded-full text-lg bg-mainPurple text-mainText hover:bg-hoverPurple "
        >
          Back to list
        </Link>
      </div>

      <div>
        {property.imageUrls?.length > 0 && (
          <ImageSlider images={property.imageUrls} />
        )}

        
      </div>
      <div>
        <h1 className="text-5xl font-semibold text-mainText mb-3 ">{property.name}</h1>
        <p className="text-secText text-lg font-medium">{property.location}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:pl-4">
        <InfoItem label="Type" value={property.type} />
        <InfoItem label="Price" value={property.price} isCurrency />
        <InfoItem
          label="Listing Price"
          value={property.listing_price}
          isCurrency
        />
        <InfoItem label="Bedrooms" value={property.bedrooms} />
        <InfoItem label="Bathrooms" value={property.bathrooms} />
        <InfoItem label="Area" value={property.area} unit="m²" />
        <InfoItem label="Build Year" value={property.build_year} />
        <InfoItem label="Tag Description" value={property.tag_description} />
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
        <h2 className="text-2xl font-semibold text-mainText mb-4">Financial Breakdown</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-sm lg:pl-4">
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
      {property.features?.length > 0 && (
        <div>
          <h2 className="text-2xl text-mainText font-semibold mb-3">Features</h2>
          <ul className="list-disc list-inside text-secText marker:text-mainPurple pl-4">
            {property.features.map((feature: string, idx: number) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <h2 className="text-2xl text-mainText font-semibold mb-3">Feature Description</h2>
        <p className="text-secText lg:pl-4">{property.feature_description}</p>
      </div>
      <div>
        <h2 className="text-2xl text-mainText font-semibold mb-3">Description</h2>
        <p className="text-secText w-full md:w-1/2 lg:pl-4">{property.description}</p>
      </div>
    </div>
  );
}