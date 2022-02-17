const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    project: {
      type: String,
      required: [true, 'Please select a project'],
      enum: ['Java', 'Python', 'JavaScript', 'C++'],
    },
    description: {
      type: String,
      required: [true, 'Please Please enter a description of the ticket.'],
    },
    link: {
      type: String,
      default: 'N.A.',
      required: [
        false,
        'Pleae enter a link to the project. N.A., if not provided.',
      ],
    },
    status: {
      type: String,
      required: true,
      enum: ['NEW', 'OPEN', 'CLOSED'],
      default: 'NEW',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ttckey', ticketSchema);
