let mission = []
let spaceIndex = 0

// Call all functions once page loads.

const main = async () => {
  updatePicture()
  callLaunchInfo()
}

// Update daily NASA image.

const updatePicture = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  const picData = await response.json()
  console.log(picData)
  const pic = (document.querySelector('.pic').style.backgroundImage = `url(${
    picData.hdUrl
  })`)

  console.log('Background image uploaded!')

  document.querySelector('.copyright').textContent = picData.copyright
  console.log('Copyright loaded', picData.copyright)

  document.querySelector('.title').textContent = picData.title
  console.log('Title loaded', picData.title)
}

// Update MissionLaunch Section of the webpage.

// Create a class of the launch data to better organize and pull the required info from the API array.

class launchData {
  constructor(title, info, time, location) {
    this.title = title
    this.info = info
    this.time = time
    this.location = location
  }
}

const callLaunchInfo = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )
  const spaceData = await response.json()
  console.log(spaceData)

  // Turn the API information into a class of the data.

  spaceData.forEach(launch => {
    spaceData.push(
      new launchData(
        launch.mission_name,
        launch.details,
        launch.launch_date_unix,
        launch.launch_site.site_name_long
      )
    )

    // Create variables from the class.
    missionLaunch = launchData
    missionTitle = launch.mission_name
    missionInfo = launch.details
    missionTime = launch.launch_date_unix
    missionSite = launch.launch_site.site_name_long

    // Turn the class list into an array so can pull the individual data onto the webpage as indexes.

    // const missionNameArray = missionTitle.map(missionTitleItem => {
    //   return missionTitleItem
    // })
  })
}

// const callLaunchBox = () => {
//   missionArray()

//   document.querySelector('.mission-title').textContent = missionTitle

//   document.querySelector('.mission-info').textContent = missionInfo

//   document.querySelector('.mission-location').textContent = missionSite

//   console.log(mission.site_name_long)
// }

// const scrollLaunchBox = () => {}

document.addEventListener('DOMContentLoaded', main)
