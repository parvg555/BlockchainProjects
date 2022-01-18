// SPDX-License-Identifier: MIT
pragma solidity >=0.8.11;

contract Decentragram {
    // Defining an applcation name
    string public name = "Decentragram";

    // Structure of a post
    struct Post {
        uint id;
        string hash;
        string description;
        uint likes;
        address author;
    }

    // creating an event structure
    // for new post event
    event newPost(
        uint id,
        string hash,
        string description,
        uint likes,
        address author
    );

    // Creating an event structure
    // for like event
    event postLiked(
        uint id,
        string hash,
        string description,
        uint likes,
        address author
    );

    // Storing Posts
    mapping(uint => Post) public posts;
    // counts the total number of Posts
    // using this to create post id
    uint public postCount = 0;

    // Create Posts
    function uploadPost(
        string memory _imgHash,
        string memory _description
    ) public {
        // Making sure that description is not blank
        require(bytes(_description).length > 0);
        // Making sure that img is not blank
        require(bytes(_imgHash).length > 0);
        // Making sure uploaders address
        // is not blank
        require(msg.sender != address(0));

        // Increment postCount every time
        // a new post is uploaded
        postCount = postCount + 1;

        // Creating a new Post object 
        // to be stored in blockchain
        posts[postCount] = Post(
            postCount,
            _imgHash,
            _description,
            0,
            msg.sender
        );

        // Emitting newPost event every
        // time a new post is created
        emit newPost(
            postCount, 
            _imgHash, 
            _description, 
            0,
            msg.sender
        );

    }

    //Like Post
    function likePost(
        uint _id
    ) public payable {
        // Checking for valid id
        require(_id>0&&_id<=postCount);
        // Fetching the post
        Post memory _post = posts[_id];
        // Getting the address of author
        address _author = _post.author;
        // Paying author 
        payable(address(_author)).transfer(msg.value);
        // Incrementing the likes
        _post.likes = _post.likes + 1;
        // Triggeting post liked event
        emit postLiked(
            _id,
            _post.hash, 
            _post.description, 
            _post.likes, 
            _author
        );
    }

}