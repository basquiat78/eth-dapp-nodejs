pragma solidity >=0.4.21 <0.6.0;

contract BasquiatContract {
    struct Bass {
        string brand;
        string basstype;
        uint stringno;
    }

    mapping(uint256 => Bass) bassInfo;

    function setBassInfo(uint _bassId, string memory _brand, string memory _basstype, uint _stringno) public {
        Bass storage bass = bassInfo[_bassId];
        bass.brand = _brand;
        bass.basstype = _basstype;
        bass.stringno = _stringno;
    }

    function getBassInfo(uint256 _bassId) public view returns (string memory, string memory, uint) {
        return (bassInfo[_bassId].brand, bassInfo[_bassId].basstype, bassInfo[_bassId].stringno);
    }
}