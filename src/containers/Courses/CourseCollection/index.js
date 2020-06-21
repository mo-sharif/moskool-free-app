/**
 * Collections is a container that fetches firebase data using hooks and renders a list of all collections
 * @param {Object} authUser - Passed from parent container and has everything about the logged in user
 * @param {Object} collection - Passed from parent with a title and a path of the collection
 * @param {Object} firebase - Firebase class provides access to authUser and db - comes from withAuthentication hoc
 * @param {Object} match - Contains information about how a <Route path> matched the URL - comes from withRouter and passed to withAuthentication hoc
 * @returns {<CoursePage/>} - returns CoursePage component which contains the rest of the components
 */

import React from "react";
import useCollections from "hooks/useCollections";
import CoursePage from "./CoursePage";

const CourseCollection = ({ authUser, collection, firebase, match }) => {
  const collections = useCollections(collection.path, firebase);

  if (!collections) {
    return;
  }
  return (
    <CoursePage
      authUser={authUser}
      isLoading={collections.isLoading}
      match={match}
      courses={collections.data}
      collectionDetails={{
        title: collection.title,
        isProgressBar: collection.isProgressBar
      }}
    />
  );
};
export default CourseCollection;