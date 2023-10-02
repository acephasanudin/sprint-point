import React from "react";

// components

import Profiles from "../../components/Profiles/Profiles";

// layout for page

import Admin from "../../layouts/Admin";

export default function ProfilesPage() {
  return (
    <Admin>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <Profiles />
        </div>
      </div>
    </Admin>
  );
}

ProfilesPage.layout = Admin;
