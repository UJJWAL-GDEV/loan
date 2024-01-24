import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Accordion } from "flowbite-react";

const SidebarItem = ({ openSidebar, item }) => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      openSidebar(false);
    }
  };

  if (item.childrens) {
    return (
      <Accordion collapseAll>
        <Accordion.Panel>
          <Accordion.Title>
            <div className="sidebar-item plain">{item.title}</div>
          </Accordion.Title>

          <Accordion.Content>
            {item.childrens.map((child, index) => (
              <SidebarItem key={index} item={child} />
            ))}
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    );
  } else {
    return (
      <Link
        onClick={handleLinkClick}
        to={item.path || "#"}
        className="sidebar-item plain"
      >
        {item.icon && <i className={item.icon}></i>}
        {item.title}
      </Link>
    );
  }
};

// PropTypes
SidebarItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    childrens: PropTypes.arrayOf(
      PropTypes.shape({
        // Recursively check for children PropTypes if needed
        icon: PropTypes.string,
        title: PropTypes.string.isRequired,
        path: PropTypes.string,
        childrens: PropTypes.array,
      })
    ),
  }),
};

export default SidebarItem;





// import PropTypes from "prop-types";
// import { useState } from "react";
// import { Link } from "react-router-dom";

// const SidebarItem = ({ openSidebar, item }) => {
//   const [open, setOpen] = useState(false);

//   const handleLinkClick = () => {
//     if (window.innerWidth < 768) {
//       openSidebar(false);
//     }
//   };

//   if (item.childrens) {
//     return (
//       <div className={open ? "sidebar-item open" : "sidebar-item"}>
//         <div onClick={() => setOpen(!open)} className="sidebar-title">
//           <span>
//             {item.icon && <i className={item.icon}></i>}
//             {item.title}
//           </span>
//           <i className="bi-chevron-down toggle-btn"></i>
//         </div>
//         <div
//         className="sidebar-content">
//           {item.childrens.map((child, index) => (
//             <SidebarItem key={index} item={child} />
//           ))}
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <Link onClick={handleLinkClick}
//       to={item.path || "#"} className="sidebar-item plain">
//         {item.icon && <i className={item.icon}></i>}
//         {item.title}
//       </Link>
//     );
//   }
// };

// // PropTypes
// SidebarItem.propTypes = {
//   item: PropTypes.shape({
//     icon: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     path: PropTypes.string,
//     childrens: PropTypes.arrayOf(
//       PropTypes.shape({
//         // Recursively check for children PropTypes if needed
//         icon: PropTypes.string,
//         title: PropTypes.string.isRequired,
//         path: PropTypes.string,
//         childrens: PropTypes.array,
//       })
//     ),
//   }),
// };

// export default SidebarItem;

