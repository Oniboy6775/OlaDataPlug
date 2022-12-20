import React, { useState } from "react";
import { toast } from "react-toastify";
import FormInput from "../components/FormInput";
import FormRowSelect from "../components/FormRowSelect";
import { useGlobalContext } from "../context/UserContext";

const UpdatePrice = () => {
  const {
    networkList,
    filteredDataOptions,
    handleChange,
    selectedDataObj,
    updatePrice,
  } = useGlobalContext();
  const [newPrice, setNewPrice] = useState({
    api: "",
    reseller: "",
    price: "",
  });
  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    handleChange({ name, value });
  };
  const handleLocalChange = (e) => {
    setNewPrice((oldDetails) => {
      return { ...oldDetails, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { price, reseller, api } = newPrice;
    if (!price && !reseller && !api)
      return toast.error("Please enter a valid value");
    updatePrice(newPrice);
    setNewPrice({
      api: "",
      reseller: "",
      price: "",
    });
  };
  return (
    <div className="flex justify-center pt-15 items-center">
      <form onSubmit={handleSubmit} className="form">
        <FormRowSelect
          handleChange={handleInputChange}
          list={networkList}
          labelText="network"
          name="selectedNetwork"
        />
        <FormRowSelect
          handleChange={handleInputChange}
          list={filteredDataOptions || []}
          labelText="select data to update"
          name="selectedPlan"
        />
        <div className="flex justify-between pt-10">
          <FormInput
            placeholder={selectedDataObj.my_price}
            labelText="price"
            type="number"
            name="price"
            value={newPrice.price}
            handleChange={handleLocalChange}
          />
          <FormInput
            placeholder={selectedDataObj.resellerPrice}
            labelText="resellers"
            type="number"
            name="reseller"
            value={newPrice.reseller}
            handleChange={handleLocalChange}
          />
          <FormInput
            placeholder={selectedDataObj.apiPrice}
            labelText="api users"
            type="number"
            name="api"
            value={newPrice.api}
            handleChange={handleLocalChange}
          />
        </div>
        <button className="btn btn-block mt-5">Update</button>
      </form>
    </div>
  );
};

export default UpdatePrice;
