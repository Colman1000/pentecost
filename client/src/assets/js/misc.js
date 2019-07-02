export const convertToTotalUnits = (qty, qtyObj) => {
  const qtyArray = qty.split(",");
  let totalUnits = 0;
  qtyArray.forEach(function(item) {
    const itemArray = item.trim().split(" ");
    let itemQty = parseFloat(
        itemArray[0].replace(/and /g, "").replace(/,/g, "") || ""
      ),
      itemPackage = itemArray[1].toLowerCase().trim(),
      itemPackageLength = itemPackage.length;

    itemPackage =
      itemPackage.substr(itemPackageLength - 1) === "s"
        ? itemPackage.substr(0, itemPackageLength - 1)
        : itemPackage;

    if (!qtyObj[itemPackage] && itemPackage !== "unit") {
      console.error(
        "Error can't multiply " +
          itemQty +
          " with " +
          qtyObj[itemPackage] +
          " using NaN instead"
      );
    }

    let multiplier = NaN; //default... so it gives NaN when something goes wrong
    if (typeof qtyObj[itemPackage] !== "undefined") {
      multiplier = qtyObj[itemPackage];
    } else if (itemPackage === "unit") {
      multiplier = 1;
    }

    totalUnits += itemQty * multiplier;
  });

  return totalUnits;
};

export const convertQtyToUserFriendlyFormat = (qty = 0, structureObj) => {
  let { qtyPerCard = 0, qtyPerPack = 0, qtyPerCarton = 0 } = structureObj;

  // converting to number in case var was originally a string
  qtyPerCard = qtyPerCard * 1;
  qtyPerPack = qtyPerPack * 1;
  qtyPerCarton = qtyPerCarton * 1;

  let rem = qty,
    cartons = 0,
    packs = 0,
    cards = 0,
    units;

  // <obsolate!!!>
  if (qtyPerCarton !== 0) {
    cartons = parseInt(rem / qtyPerCarton, 10);
    rem = rem % qtyPerCarton;
  }
  //</obsolate!!!>

  if (qtyPerPack !== 0) {
    packs = parseInt(rem / qtyPerPack, 10);
    rem = rem % qtyPerPack;
  }

  if (qtyPerCard !== 0) {
    cards = parseInt(rem / qtyPerCard, 10);
    rem = rem % qtyPerCard;
  }

  units = rem;

  return { packs: packs, cards: cards, units: units };
};

export function parseString(str) {
  let index = 0,
    foundSpecialString = false,
    specialStringStartIndex = -1,
    returnString = "";
  while (str[index]) {
    let character = str[index];

    if (character === "$" && str[index + 1] === "{") {
      foundSpecialString = true;
      specialStringStartIndex = index;
    }

    !foundSpecialString ? (returnString += character) : null;

    if (foundSpecialString && character === "}") {
      returnString +=
        specialStringStartIndex !== -1
          ? parseString__Compose(
              str.substring(specialStringStartIndex, index + 1)
            )
          : "";
      specialStringStartIndex = -1;
      foundSpecialString = false;
    }

    index++;
  }

  return returnString;
}

function parseString__Compose(str) {
  str =
    str.indexOf("${") === 0 ? str.substring(2, str.length - 1).split(":") : str;

  let func = str.shift(),
    value = str.join(":").trim();
  return parseString__Execute({
    func: func,
    value: value,
  });
}

// function parseString__Execute(obj) {
//   /**
//    * checking if object was sent instead
//    * Object must be in the form :=>
//    * {
//    *      func
//    *      value
//    * }
//    *
//    *
//    * @availableHelpers
//    * time: Formats date string to 12-Hr time format eg 12:13 AM
//    * number: formats number string to comma separated numbers eg 23,457
//    * date: Formats date string to date format eg August 21st, 2018
//    * fulldate: Formats date string to date format eg Sunday, 21st August, 2018
//    * from: Formats date string to timeAgo format eg 2 days ago
//    * to: Formats date string to inTime format eg in 2 days
//    * day: Formats date string to day of the week eg Sunday
//    * time24: Formats date string to 24-Hr time format eg 00:13
//    * composite: requires the complete function in string format eg
//    *            {
//    *              func: 'composite',
//    *              value : 'moment( new Date() ).fromNow()'
//    *            }
//    *            ===> moment( new Date() ).fromNow()
//    *
//    * default: expects the name of the function  eg
//    *             {
//    *              func: 'FUNCTIONS.capitalizeWord',
//    *              value : '[string]'
//    *            }
//    *            ===> FUNCTIONS.capitalizeWord( [string] )
//    *
//    * */

//   let cmd = obj.func || "",
//     computed = obj.value || "";
//   if (!cmd) return computed;

//   switch (cmd) {
//     case "time": {
//       computed = moment(computed).format("h:mm a");
//       break;
//     }
//     case "number": {
//       computed *= 1;
//       computed = formatNumber(computed);
//       break;
//     }
//     case "date": {
//       computed = moment(computed).format("Do MMMM, YYYY");
//       break;
//     }
//     case "fulldate": {
//       computed = moment(computed).format("dddd, Do MMMM, YYYY");
//       break;
//     }
//     case "datetime": {
//       computed = `${moment(computed)
//         .format("h:mm a")
//         .toUpperCase()} - ${moment(computed).format("Do MMMM,YYYY")}`;
//       break;
//     }
//     case "from": {
//       computed = moment(computed).fromNow();
//       break;
//     }
//     case "to": {
//       computed = moment(computed).toNow();
//       break;
//     }
//     case "day": {
//       computed = moment(computed).format("dddd");
//       break;
//     }
//     case "time24": {
//       computed = moment(computed).format("HH:mm");
//       break;
//     }
//     case "currency": {
//       computed = getSetting("currency");
//       break;
//     }
//     case "money": {
//       computed = `${formatNumber(computed * 1)} ${getSetting("currency")}`;
//       break;
//     }
//     case "composite": {
//       computed = eval(computed);
//       break;
//     }
//     default: {
//       try {
//         cmd = cmd + "( '" + computed + "' )";
//         computed = eval(cmd);
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   }

//   return computed;
// }

export const BG_COLORS = Array(
  "bg-teal-gradient",
  "bg-blue-gradient",
  "bg-light-blue-gradient",
  "bg-aqua-gradient",
  "bg-yellow-gradient",
  "bg-purple-gradient",
  "bg-green-gradient",
  "bg-pink-gradient",
  "bg-abid-gradient",
  "bg-apex-gradient",
  "bg-teal-active",
  "bg-blue-active",
  "bg-light-blue-active",
  "bg-aqua-active",
  "bg-yellow-active",
  "bg-pink-active",
  "bg-obscure-active",
  "bg-abid-active",
  "bg-apex-active"
);
