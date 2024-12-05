import React, { useState } from "react";
import { HiChevronLeft } from "react-icons/hi2";
import "./SaveSegment.css";
import Input from "../components/Input";
import { CgLoadbar } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { addSegment } from "../redux/slice/segmentSlice";

const SaveSegment = ({ close }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [schemaOptions, setSchemaOptions] = useState([
    { id: 1, label: "First Name", value: "first_name" },
    { id: 2, label: "Last Name", value: "last_name" },
    { id: 3, label: "Gender", value: "gender" },
    { id: 4, label: "Age", value: "age" },
    { id: 5, label: "Account Name", value: "account_name" },
    { id: 6, label: "City", value: "city" },
    { id: 7, label: "State", value: "state" },
  ]);

  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setSegmentName(e.target.value);
  };

  const handleAddSchema = () => {
    if (selectedSchema) {
      const schemaToAdd = schemaOptions.find(
        (option) => option.label === selectedSchema
      );
      if (
        schemaToAdd &&
        !schemas.some((schema) => schema.label === schemaToAdd.label)
      ) {
        setSchemas((prevSchemas) => [...prevSchemas, schemaToAdd]);
        setSelectedSchema("");
      }
    }
  };

  const handleSubmit = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };
    console.log("Sending to server: ", JSON.stringify(segmentData));
    // debugger;
    dispatch(addSegment(segmentData));
    alert("Open the console");
    // dispatch(addNewSegment(segmentData));
    //   close();
  };

  //   let newValue = schemaOptions.filter((option) => !schemas.some(schema => schema.label === option.label))
  //   console.log("New value => ", newValue);
  return (
    <div className="model">
      <div className="model-container">
        <div className="model-nav">
          <p>
            <HiChevronLeft /> Save Segment
          </p>
        </div>
        <div className="container">
          <div>
            <label id="name-label">Enter the Name of the Segment</label>
            <br />
            <Input
              type="text"
              value={segmentName}
              onChange={handleInputChange}
              placeholder="Name of the segment"
            />
          </div>
          <div>
            <p className="text">
              To save your segment, you need to add the schemas to build the
              query
            </p>
          </div>
          <div>
            {schemas &&
              schemas.map((schema) => (
                <div key={schema.id}>
                  <select
                    className="dropdown"
                    value={schema.value}
                    onChange={() => {}}
                  >
                    <option key={schema.id} value={schema.value}>
                      {schema.label}
                    </option>
                  </select>
                  <span>
                    <CgLoadbar />
                  </span>
                </div>
              ))}
          </div>
          <div className="dropdown-container">
            <select
              className="dropdown"
              value={selectedSchema}
              onChange={(e) => setSelectedSchema(e.target.value)}
            >
              <option value="" disabled>
                Add schema to segment
              </option>
              {schemaOptions
                .filter(
                  (option) =>
                    !schemas.some((schema) => schema.label === option.label)
                )
                .map((option) => (
                  <option key={option.id} value={option.label}>
                    {option.label}
                  </option>
                ))}
            </select>
            <span>
              <CgLoadbar />
            </span>
            <button id="addBtn" onClick={handleAddSchema}>
              + Add new schema
            </button>
          </div>
        </div>
        <div className="footer">
          <button id="save-btn" onClick={handleSubmit}>
            Save the segment
          </button>
          <button id="cancel-btn" onClick={() => close()}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveSegment;
