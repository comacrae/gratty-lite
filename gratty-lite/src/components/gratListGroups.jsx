import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function getGroupedList(list, perGroup) {
  let groups = [];
  const numGroups = Math.ceil(list.length / perGroup);
  let idx = 0;
  for (let groupsIdx = 0; groupsIdx < numGroups; groupsIdx++) {
    let group = [];
    //if (idx + perGroup > list.length) perGroup = list.length - idx;
    for (let groupIdx = 0; groupIdx < perGroup; groupIdx++) {
      if (idx >= list.length) {
        group.push({ id: idx, created_at: "" });
      } else {
        group.push(list[idx++]);
      }
    }
    groups.push(group);
  }
  return groups;
}

export default function gratitudeListGroup({ list, perGroup }) {
  const lists = getGroupedList(list, perGroup);
  return lists.map((list, rowIdx) => (
    //flex col up to sm breakpoint, then flexrow
    <Row
      key={rowIdx}
      className="d-flex flex-column flex-sm-row justify-content-center"
    >
      {list.map((item, colIdx) => (
        <Col key={colIdx} className="text-center ">
          <Link to={item.id} key={item.id}>
            {item.created_at}
          </Link>
        </Col>
      ))}
    </Row>
  ));
}
