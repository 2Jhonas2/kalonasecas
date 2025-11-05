import React, { useState } from 'react';
import { FormPackage } from './FormPackage';
import './AddPackage.css'; // Import the CSS file

export function AddPackage() {
  const [showFormPackageModal, setShowFormPackageModal] = useState(false);

  const handleAddPackageClick = () => {
    setShowFormPackageModal(true);
  };

  const handleCloseModal = () => {
    setShowFormPackageModal(false);
  };

  const handlePackageAdded = () => {
    // Logic to handle what happens after a package is successfully added
    // For now, just close the modal
    setShowFormPackageModal(false);
  };

  return (
    <>
      <button onClick={handleAddPackageClick} className="add-package-button">
       + Add Package
      </button>

      {showFormPackageModal && (
        <FormPackage
          onClose={handleCloseModal}
          onPackageAdded={handlePackageAdded}
        />
      )}
    </>
  );
}