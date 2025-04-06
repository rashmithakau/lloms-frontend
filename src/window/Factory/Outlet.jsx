import React, { useEffect, useState } from "react";
import OutletList from "../../components/OutletList/OutletList.jsx";
import { getAllOutlets } from "../../api/outlet_service/outletController.js";
import OutletModal from "../../components/OutletModal/OutletModal";

function Outlet() {
    const [outlets, setOutlets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchOutlets();
    }, []);

    const fetchOutlets = async () => {
        try {
            const data = await getAllOutlets();
            setOutlets(data);
        } catch (error) {
            console.error("Error fetching outlets:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Outlets</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
                >
                    Add New Outlet
                </button>
            </div>

            <OutletList outlets={outlets} />

            <OutletModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSaveSuccess={fetchOutlets}
            />
        </div>
    );
}

export default Outlet;