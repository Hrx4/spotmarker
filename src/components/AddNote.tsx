import { useCallback, useEffect, useState } from "react";
import ReactMapGl, { Layer, Marker, Source } from "react-map-gl";
import { v4 as uuidv4 } from "uuid";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";

const AddNote = () => {
  const [routeGeoJSON, setRouteGeoJSON] = useState(null);
  interface Location {
    latitude: number;
    longitude: number;
  }
  // Waypoints for the route
  const waypoints = [
    [-122.4194, 37.7749], // San Francisco
    [-121.8863, 37.3382], // San Jose
    [-122.2711, 37.8044], // Oakland
  ];

  useEffect(() => {
    const fetchRoute = async () => {
      const coordinates = waypoints.map((coord) => coord.join(",")).join(";");
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${
        import.meta.env.VITE_MAP_KEY
      }`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length > 0) {
        setRouteGeoJSON(data.routes[0].geometry);
      }
      console.log("ji");
    };

    fetchRoute();
  }, []);
  // },[waypoints]):;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [location, setLocation] = useState<Location>({
    latitude: 37.7749,
    longitude: 84,
  });
  const [mapModal, setMapModal] = useState<Boolean>(false);
  const [searchBox, setSearchBox] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  // navigator.geolocation.getCurrentPosition((pos)=>{
  //   return pos.coords.latitude
  // }),
  const [searchList, setSearchList] = useState([]);
  const SessionToken = uuidv4()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    if (image) form.append("image", image);
    form.append("title", title);
    form.append("content", description);
    form.append("location", JSON.stringify(location));
    form.append("authorId", "1");
    axios
      .post("http://localhost:8080/note", form)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [viewPort, setViewPort] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8,
  });

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [28, 77],
        [29, 78],
      ],
    },
  };

  const handleSelectLocation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDebouncedTerm("")
    setSearchBox("")
    setLocation({
      latitude: viewPort.latitude,
      longitude: viewPort.longitude,
    });
    setMapModal(false);
  };

  const locateMarker = async(key : any)=>{
   
    setSearchList( searchList.filter((item : any)=>item.mapbox_id===key))
    const url = `https://api.mapbox.com/search/searchbox/v1/retrieve/${key}?access_token=${import.meta.env.VITE_MAP_KEY}&session_token=${SessionToken}`
    await axios.get(url).then((res)=>{
      setViewPort({
        ...viewPort,
        latitude: res.data.features[0].geometry.coordinates[1],
        longitude: res.data.features[0].geometry.coordinates[0],
      })
    })
  }


  useEffect(() => {
    // Set a timer to update debouncedTerm after 1000ms
    const timer = setTimeout(() => {
      setDebouncedTerm(searchBox);
    }, 1000);

    // Cleanup function to clear the timer if searchBox changes
    return () => clearTimeout(timer);
  }, [searchBox]);

  const mapListCallback =useCallback(
    () => {
      console.log("debouncedTerm", encodeURIComponent(debouncedTerm));
      let location = "23.59296, 87.2415232";
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          location = `${pos.coords.longitude}, ${pos.coords.latitude}`;
        });
      }
      // console.log(uuidv4());
      location = encodeURIComponent(location);
       axios
      .get(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${encodeURIComponent(
          debouncedTerm
        )}&session_token=${SessionToken}&language=en&limit=5&proximity=${location}&access_token=${
          import.meta.env.VITE_MAP_KEY
        }`
      )
      .then((res) => setSearchList(res.data.suggestions))
      .catch((err) => {
        console.log(err);
      });
    
    },
    [debouncedTerm],
  )
  

  useEffect(() => {
    if (debouncedTerm) {
      console.log("debouncedTerm", debouncedTerm);
      // Call your API here with debouncedTerm
      mapListCallback()
      // Example: fetch(`/api/search?q=${debouncedTerm}`)

      
    }
  }, [debouncedTerm]);

  return (
    <>
      <div className="flex items-center justify-center min-h-full bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        >
          <h2 className="mb-4 text-2xl font-bold text-gray-800">Add Note</h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter note title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Enter note description"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) =>
                e.target.files ? setImage(e.target.files[0]) : setImage(null)
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Choose note Image"
            />
          </div>
          <div className="mb-4">
            <button
              className=" px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMapModal(true)}
            >
              Choose Location
            </button>
            <p className="mt-4 text-sm text-gray-700">
              Selected Location: Latitude: {location.latitude}, Longitude:{" "}
              {location.longitude}
            </p>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Note
          </button>
        </form>
      </div>

      {mapModal ? (
        <div className=" absolute w-full h-full  backdrop-blur-sm top-0 left-0  z-40 flex justify-center items-center rounded-lg"
        onClick={()=>setMapModal(false)}
        >
          <div className=" h-[90%] w-[90%] bg-white opacity-100 rounded-md" onClick={(e)=>{
            e.stopPropagation()
          }}>
            <ReactMapGl
              {...viewPort}
              onDblClick={(e) => {
                console.log(e.lngLat);
                setViewPort((view) => ({
                  ...view,
                  latitude: e.lngLat.lat,
                  longitude: e.lngLat.lng,
                }));
              }}
              zoom={viewPort.zoom}
              // onDrag={(e) => {
              //   console.log(e);
              //   setViewPort({
              //     latitude: e.viewState.latitude,
              //     longitude: e.viewState.longitude,
              //   });
              // }}
              onDrag={(e) => {
                setViewPort({
                  latitude: e.viewState.latitude,
                  longitude: e.viewState.longitude,
                  zoom: e.viewState.zoom,
                });
              }}
              scrollZoom={true}
              onZoom={(e) => {
                console.log(e);
                setViewPort({
                  latitude: e.viewState.latitude,
                  longitude: e.viewState.longitude,
                  zoom: e.viewState.zoom,
                });
              }}
              mapboxAccessToken={import.meta.env.VITE_MAP_KEY}
              mapStyle="mapbox://styles/mapbox/streets-v9"
            >
              <Marker
                longitude={viewPort.longitude}
                latitude={viewPort.latitude}
                anchor="bottom"
                offset={[0, -10]}
                draggable
                onDragEnd={(e) => {
                  console.log(e);
                  setViewPort((view) => ({
                    ...view,
                    latitude: e.lngLat.lat,
                    longitude: e.lngLat.lng,
                    // zoom: 4,
                  }));
                }}
              >
                <MapMarker />
              </Marker>
              <div className=" top-5 w-full flex justify-center flex-col items-center  absolute">
                <input
                  type="text"
                  className=" h-12 pl-3 rounded-md w-11/12 border-gray-300 
             border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search for a place or address"
                  value={searchBox}
                  onChange={(e) => setSearchBox(e.target.value)}
                />
                <div
                  className={` ${
                    searchBox ? "" : "hidden"
                  } max-h-80 w-11/12 p-2 m-2 bg-red-300 rounded-md overflow-y-scroll`}
                >
                  {searchList?.map((item: any, index) => (
                    <div className=" h-11 m-1 bg-blue-300 text-base font-bold cursor-pointer" key={item.mapbox_id} onClick={()=>locateMarker(item.mapbox_id)}>
                      {item.name}
                      <div className="text-xs font-normal">
                        {item.place_formatted}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className=" p-4 rounded-md bg-red-400 absolute bottom-6 right-6"
                onClick={handleSelectLocation}
              >
                Select Location
              </button>
            </ReactMapGl>
          </div>
        </div>
      ) : null}
    </>
  );
};

const MapMarker = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="h-6 w-6 text-red-500"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
    />
  </svg>
);

export default AddNote;

// <Source id="marker" type="geojson" data={{type : "Feature" , geometry : }}>
//               <Layer
//                 id="lineLayer"
//                 type="line"
//                 source="my-data"
//                 layout={{
//                   "line-join": "round",
//                   "line-cap": "round",
//                 }}
//                 paint={{
//                   "line-color": "rgba(3, 170, 238, 0.5)",
//                   "line-width": 5,
//                 }}
//               />
//             </Source>

// {routeGeoJSON && (
//         <Source id="route" type="geojson" data={{ type: 'Feature', geometry: routeGeoJSON }}>
//           <Layer
//             id="route-layer"
//             type="line"
//             paint={{
//               'line-color': 'red',
//               'line-width': 4,
//             }}
//           />
//         </Source>
//       )}
