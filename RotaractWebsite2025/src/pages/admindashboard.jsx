import { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const adminEmails = ["apzebin@gmail.com"]; // Add more admin emails if needed

export default function AdminDashboard() {
  const [seniorApplications, setSeniorApplications] = useState([]);
  const [juniorApplications, setJuniorApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser || !adminEmails.includes(currentUser.email)) {
        navigate("/");
        return;
      }

      try {
        const seniorSnap = await getDocs(collection(db, "seniorCouncilApplications"));
        const juniorSnap = await getDocs(collection(db, "juniorCouncilApplications"));

        setSeniorApplications(seniorSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setJuniorApplications(juniorSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate("/");
  };

  const renderApplications = (title, applications) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-300">{title}</h2>
      {applications.length === 0 ? (
        <p className="text-gray-500 italic">No applications submitted yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          {applications.map((app, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{app.name}</h3>
              <p className="text-sm"><strong>Email:</strong> {app.email}</p>
              <p className="text-sm"><strong>Contact:</strong> {app.contact}</p>
              <p className="text-sm"><strong>Preferences:</strong> {app.preference1}, {app.preference2}, {app.preference3}</p>
              <div className="mt-3">
                <p className="font-semibold mb-1">Documents:</p>
                <ul className="list-disc list-inside text-blue-600 text-sm space-y-1">
                  {(app.documents || []).map((doc, i) => (
                    <li key={i}>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {doc.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  if (loading) return <div className="p-4 text-center text-gray-600">Loading...</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
        >
          Logout
        </button>
      </div>

      {renderApplications("Senior Council Applications", seniorApplications)}
      {renderApplications("Junior Council Applications", juniorApplications)}
    </div>
  );
}
