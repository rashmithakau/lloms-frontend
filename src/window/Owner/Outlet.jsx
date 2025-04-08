import React, { useState, useEffect } from "react";
import CardContainer from "../../components/cardContainer/CardContainer";
import LoadingWheel from "../../components/loadingWheel/LoadingWheel";
import OutletCardOwner from "../../components/OutletCard/OutletCardOwner";
import EditOutletModal from "../../components/EditOutletModal/EditOutletModal"; // Import the modal
import { getAlleOutletsForOwner } from "../../api/outlet_service/outletController";

function Outlet() {
    const [loading, setLoading] = useState(true);
    const [outlets, setOutlets] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOutlet, setSelectedOutlet] = useState(null);

    useEffect(() => {
        fetchOutlets();
    }, []);

    const fetchOutlets = async () => {
        try {
            const data = await getAlleOutletsForOwner();
            setOutlets(data);
        } catch (error) {
            console.error("Error fetching outlets:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCardClick = (outlet) => {
        setSelectedOutlet(outlet);
        setIsEditModalOpen(true);
    };

    return (
        <div className="p-2">
            <CardContainer h="90vh">
                {loading ? (
                    <div className="text-center text-gray-600 py-5 text-lg">
                        <LoadingWheel />
                    </div>
                ) : outlets.length > 0 ? (
                    outlets.map((outlet) => (
                        <OutletCardOwner
                            key={outlet.id}
                            outlet={outlet}
                            onClick={() => handleCardClick(outlet)}
                        />
                    ))
                ) : (
                    <div className="text-center text-gray-600 py-5 text-lg">
                        No outlets available.
                    </div>
                )}
            </CardContainer>

            <EditOutletModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                outlet={selectedOutlet}
                onSaveSuccess={fetchOutlets}
            />
        </div>
    );
}

export default Outlet;