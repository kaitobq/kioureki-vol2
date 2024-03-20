"use client";

import { OrganizationList, useOrganization } from "@clerk/nextjs";
import { Box, Container } from "@yamada-ui/react";

const page = () => {
  const { invitations } = useOrganization({
    invitations: {
      pageSize: 20,
      initialPage: 2, // skips the first page
    },
  });
  const { memberships } = useOrganization({
    memberships: {
      infinite: true, // Append new data to the existing list
      keepPreviousData: true, // Persist the cached data until the new data has been fetched
    },
  });
  if (!memberships) {
    // Handle loading state
    return null;
  }
  return (
    <Box
      height="90vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Container width="fit-content">
        <OrganizationList
          hidePersonal
          afterSelectOrganizationUrl="/organization/organizationid"
        />
      </Container>
      {/* <ul>
        {memberships.data?.map((membership) => (
          <li key={membership.id}>
            {membership.publicUserData.firstName}{" "}
            {membership.publicUserData.lastName} &lt;
            {membership.publicUserData.identifier}&gt; :: {membership.role}
          </li>
        ))}
      </ul> */}
    </Box>
  );
};

export default page;
