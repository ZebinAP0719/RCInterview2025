import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const [userData, setUserData] = useState({ senior: null, junior: null });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate("/");
        return;
      }

      const email = user.email;

      try {
        const seniorQuery = query(
          collection(db, "seniorCouncilApplications"),
          where("email", "==", email)
        );
        const juniorQuery = query(
          collection(db, "juniorCouncilApplications"),
          where("email", "==", email)
        );

        const [seniorSnap, juniorSnap] = await Promise.all([
          getDocs(seniorQuery),
          getDocs(juniorQuery),
        ]);

        const seniorData = seniorSnap.docs[0]?.data() || null;
        const juniorData = juniorSnap.docs[0]?.data() || null;

        console.log("Senior App Data:", seniorData);
        console.log("Junior App Data:", juniorData);

        setUserData({
          senior: seniorData,
          junior: juniorData,
        });
      } catch (error) {
        console.error("Error fetching user application data:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const renderSection = (title, app) => (
    <div className="border rounded-2xl bg-white shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {app ? (
        <>
          <p><strong>Name:</strong> {app.name}</p>
          <p><strong>Email:</strong> {app.email}</p>
          <p><strong>Contact:</strong> {app.contact}</p>
          <p><strong>Preferences:</strong> {app.preference1}, {app.preference2}, {app.preference3}</p>

          {Array.isArray(app.documentURLs) && app.documentURLs.length > 0 && (
            <>
              <p className="mt-4 font-semibold">Documents:</p>
              <ul className="list-disc list-inside text-blue-600 text-sm">
                {app.documentURLs.map((url, index) => (
                  <li key={index}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      View Document {index + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </>
      ) : (
        <p className="text-gray-500 italic">No application submitted yet.</p>
      )}
    </div>
  );

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar title="User Dashboard" />
      <div className="p-6 max-w-5xl mx-auto grid gap-8 md:grid-cols-2">
        {renderSection("Senior Council Application", userData.senior)}
        {renderSection("Junior Council Application", userData.junior)}
      </div>
    </div>
  );
}
