import { useEffect, useState } from "react";

//Database
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../helpers/firebase";

//Icons
import on from "../assets/icons/switch-on.png";
import off from "../assets/icons/switch-off.png";

const ToggleMaintenance = () => {
  const [maintenance, setMaintenance] = useState(false);

  useEffect(() => {
    const fetchStoryData = async () => {
      const extraRef = doc(firestore, "extra", "maintenance");
      const extraDoc = await getDoc(extraRef);
      const extraData = extraDoc.data();
      const maintenaceState = extraData.state || false;

      if (maintenaceState) {
        setMaintenance(true);
      } else {
        setMaintenance(false);
      }
    };

    fetchStoryData();
  }, []);

  const togglerMaintenance = async () => {
    const newMaintenanceState = !maintenance;
    setMaintenance(newMaintenanceState);

    const extraRef = doc(firestore, "extra", "maintenance");
    await updateDoc(extraRef, { state: newMaintenanceState });
  };

  return (
    <div className="toggleMaintenance">
      <h1>Maintenance is {maintenance ? "on" : "off"}</h1>
      <h2>Turn it:</h2>
      <button onClick={togglerMaintenance}>
        <img src={maintenance ? off : on} alt="Toggle Maintenance" />
      </button>
    </div>
  );
};

export default ToggleMaintenance;
