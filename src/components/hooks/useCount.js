import { useState } from "react";
import { getLocalCount, storeLocalCount } from "../common/localStorage";
import { getActiveMembersCount } from "../../services/memberService";
import { getLeads } from "../../services/leadService";

const useCount = () => {
  const [activeCount, setActiveCount] = useState(getLocalCount("activeCount"));
  const [inactiveCount, setInactiveCount] = useState(
    getLocalCount("inactiveCount")
  );
  const [leadsCount, setLeadsCount] = useState(
    getLocalCount("leadsCount")
  );

  const request = async () => {
    const { data } = await getActiveMembersCount();
    setActiveCount(data.activeCount);
    setInactiveCount(data.inactiveCount);

    const { data: leads } = await getLeads();
    setLeadsCount(leads.length);

    storeLocalCount("activeCount", data.activeCount);
    storeLocalCount("inactiveCount", data.inactiveCount);
    storeLocalCount("leadsCount", leads.length);
  };

  return { activeCount, inactiveCount, leadsCount, request };
};

export default useCount;
