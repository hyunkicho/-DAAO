// // SPDX-License-Identifier: MIT
// import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
// import {Daao} from "./Daao.sol";
// import {DaaoTimelock} from "./DaaoTimelock.sol";

// pragma solidity ^0.8.20;

// contract DaaoCreate2 {

//     function createDao(
//         uint256 counter,
//         address tokenAddress,
//         address timeLockAddress
//     ) public returns (Daao) {
//         address daoAddr = getDaoCreateAddress(counter);
//         uint256 codeSize = addr.code.length;
//         if (codeSize > 0) {
//             return Daao(payable(daoAddr));
//         }
//         Daao acc = new Daao{salt: bytes32(salt)}(tokenAddress, timeLockAddress);
//         return acc;
//     }

//     function createTimelock(
//         uint256 counter,
//         uint256 minDelay,
//         address[] memory executors,
//         address admin
//     ) public returns (DaaoTimelock) {
//         address addr = getTimelockCreateAddress(counter, minDelay,);
//         uint256 codeSize = addr.code.length;
//         if (codeSize > 0) {
//             return DaaoTimelock(payable(addr));
//         }
        
//         DaaoTimelock acc = new DaaoTimelock{salt: bytes32(salt)}(
//             minDelay,
//             getDaoCreateAddress(),
//             executors,
//             admin
//         );
//         return acc;
//     }

//     function getDaoCreateAddress(
//         uint256 counter,
//         address tokenAddress,
//         address timelockAddress
//     ) public view returns (address) {
//         return
//             Create2.computeAddress(
//                 bytes32(counter),
//                 keccak256(
//                     abi.encodePacked(
//                         type(Daao).creationCode,
//                         abi.encode(tokenAddress, timelockAddress)
//                     )
//                 )
//             );
//     }

//     function getTimelockCreateAddress(
//         uint256 counter,
//         uint256 minDelay,
//         address[] memory proposers,
//         address[] memory executors,
//         address admin
//     ) public view returns (address) {
//         return
//             Create2.computeAddress(
//                 bytes32(counter),
//                 keccak256(
//                     abi.encodePacked(
//                         type(DaaoTimelock).creationCode,
//                         abi.encode(minDelay, proposers, executors,admin)
//                     )
//                 )
//             );
//     }
// }