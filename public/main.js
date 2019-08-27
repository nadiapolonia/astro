let mission = []
let spaceIndex = 0
let firstIndex = 0
let lastIndex = 0

// Create an empty array. This will be an empty container to soon be an array with the information from the API we actually need.
let launchboxData = []

// Call all functions once page loads.

const main = async () => {
  updatePicture()

  let launchboxData = await getLaunchInfo()

  lastIndex = launchboxData.length - 1

  buildLaunchbox(launchboxData)
}

// Update daily NASA image.

const updatePicture = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  const picData = await response.json()
  console.log(picData)
  const pic = (document.querySelector(
    '.pic'
  ).style.backgroundImage = `url(${picData.hdUrl})`)

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

const getLaunchInfo = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )
  const spaceData = await response.json()

  // Turn the API information into a class of the data and push into the empty array.

  spaceData.forEach(launch => {
    launchboxData.push(
      new launchData(
        launch.mission_name,
        launch.details,
        launch.launch_date_unix,
        launch.launch_site.site_name_long
      )
    )
  })

  return launchboxData
}

// Create functions for left and right buttons

const switchLaunchesUp = () => {
  // Increase index by one
  spaceIndex++

  // Scrolls back to the first index when clicking "right" on the last index item
  if (spaceIndex > lastIndex) {
    spaceIndex = firstIndex
  }

  // Call function and data within it when changing mission launch page
  buildLaunchbox(launchboxData)
}

const switchLaunchesDown = () => {
  spaceIndex--

  // Scrolls to the last index when clicking "left" on the first index item
  if (spaceIndex < firstIndex) {
    spaceIndex = lastIndex
  }

  buildLaunchbox(launchboxData)
}

// Select information in launchbox to be replaced with values in array

const buildLaunchbox = () => {
  let currentObj = launchboxData[spaceIndex]

  document.querySelector('.mission-title').textContent = currentObj.title

  document.querySelector('.mission-info').textContent = currentObj.info

  document.querySelector('.mission-location').textContent = currentObj.location

  document.querySelector('.mission-countdown').textContent = currentObj.time

  console.log(mission.site_name_long)
}

// Add functions to left and right buttons
document.querySelector('.left').addEventListener('click', switchLaunchesDown)
document.querySelector('.right').addEventListener('click', switchLaunchesUp)

// const scrollLaunchBox = () => {}

document.addEventListener('DOMContentLoaded', main)

// Extracting the information from the overall API response arrays. Objects where the property `details` is not undefined are unwanted and do not represent the launchbox information needed.

// let infoWeDontWant = spaceData.map(data => {
//   if (data.details !== undefined) {
//     return data
//   }
// })
// let launchboxData = spaceData.map(data => {
//   if (data.details === undefined) {
//     return data
//   }
// })
